import os
from typing import BinaryIO
from .base import StorageProvider

class LocalStorageProvider(StorageProvider):
    """
    Implements local file storage, primarily for development and testing environments.
    """
    def __init__(self, base_path: str = "./uploads"):
        self.base_path = base_path
        os.makedirs(self.base_path, exist_ok=True)

    def upload_file(self, file_obj: BinaryIO, filename: str, content_type: str) -> str:
        file_path = os.path.join(self.base_path, filename)
        with open(file_path, "wb") as f:
            f.write(file_obj.read())
        # In a real implementation, this would return a relative URL served by FastAPI
        return f"/uploads/{filename}"

    def delete_file(self, file_identifier: str) -> bool:
        file_path = os.path.join(self.base_path, file_identifier.replace("/uploads/", ""))
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False

    def get_file_url(self, file_identifier: str) -> str:
        return file_identifier
