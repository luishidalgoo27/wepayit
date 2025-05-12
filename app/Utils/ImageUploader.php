<?php

namespace App\Utils;

use Cloudinary\Asset\Image;
use Cloudinary\Transformation\Format;
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Delivery;
use App\Http\Requests\UploadImageRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ImageUploader
{
    public static function processImageUpload($image)
    {
        $uploaded = cloudinary()->upload($image->getRealPath(), [
            'folder' => 'wepayit'
        ]);

        $publicId = $uploaded->getPublicId();
        $url = (new Image($publicId))
            ->resize(Resize::scale()->width(250))
            ->delivery(Delivery::quality(35))
            ->delivery(Delivery::format(Format::auto()))
            ->toUrl();
        
        return [
            'url' => $url,
            'public_id' => $publicId
        ];
    }

    public function uploadImage(UploadImageRequest $req)
    {
        $url = $this->processImageUpload($req->file('image'));

        return response()->json(['url' => $url], 200);
    }

    public static function delete($publicId)
    {
        try {
            $response = Cloudinary::destroy($publicId);

            if ($response['result'] == 'ok') {
                return response()->json(['message' => 'Imagen eliminada correctamente.'], 200);
            } else {
                return response()->json(['message' => 'No se pudo eliminar la imagen.'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la imagen: ' . $e->getMessage()], 500);
        }
    }
}
?>