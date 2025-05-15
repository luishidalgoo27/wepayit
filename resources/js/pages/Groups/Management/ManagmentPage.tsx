import { useGetGroup } from "@/hooks/useGetGroup"
import { useGetUsers } from "@/hooks/useGetUsers"
import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"
import { inviteUserToGroup, removeUserFromGroup, searchUsers } from "@/services/groups"
import { User } from "@/types/user"
import { useDebounce } from "@/hooks/useDebounce"

export const ManagementPage = () => {
    const { id } = useLoaderData() as { id: string }
    const { group } = useGetGroup(id)
    const { users, refetch: refreshUsers } = useGetUsers(id)

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<User[]>([])
    const [loadingSearch, setLoadingSearch] = useState(false)

    const debouncedSearch = useDebounce(searchTerm, 300)

    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedSearch.trim()) {
                setSearchResults([])
                return
            }

            setLoadingSearch(true)
            try {
                const results = await searchUsers(debouncedSearch)
                setSearchResults(results.slice(0, 3)) // Limita a 3 resultados
            } catch (error) {
                console.error("Error al buscar usuarios", error)
            } finally {
                setLoadingSearch(false)
            }
        }

        fetchResults()
    }, [debouncedSearch])

    const handleInvite = async (userEmail: string) => {
        await inviteUserToGroup(id, userEmail)
        await refreshUsers()
    }

    const handleRemove = async (userEmail: string) => {
        await removeUserFromGroup(id, userEmail)
        await refreshUsers()
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Group Management: {group?.name}</h1>

            {/* Buscar e invitar */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Invite Users</h2>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />

                {loadingSearch && (
                    <p className="text-gray-500 mt-2">Searching...</p>
                )}

                {searchResults.length > 0 && (
                    <ul className="mt-4 space-y-2">
                        {searchResults.map((user) => (
                            <li key={user.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                <span>{user.name} ({user.email})</span>
                                <button
                                    onClick={() => handleInvite(user.email)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Invite
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Miembros del grupo */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Group Members</h2>
                {users?.length > 0 ? (
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                <span>{user.name} ({user.email})</span>
                                <button
                                    onClick={() => handleRemove(user.email)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No users in this group.</p>
                )}
            </div>
        </div>
    )
}
