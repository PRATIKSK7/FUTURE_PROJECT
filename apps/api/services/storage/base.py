from abc import ABC, abstractmethod
from typing import BinaryIO

class StorageProvider(ABC):
    """
    Abstract base class for all file storage providers.
    Ensures seamless migration between Local, S3, and Cloudinary.
    """

    @abstractmethod
    def upload_file(self, file_obj: BinaryIO, filename: str, content_type: str) -> str:
        """
        Uploads a file and returns the public URL or identifier.
        """
        pass

    @abstractmethod
    def delete_file(self, file_identifier: str) -> bool:
        """
        Deletes a file from the storage provider.
        """
        pass

    @abstractmethod
    def get_file_url(self, file_identifier: str) -> str:
        """
        Retrieves the public URL for a given file identifier.
        """
        pass
