from extended_dataset_profile import Version
from pydantic import BaseModel, ConfigDict


class VersionEvaluate(BaseModel):
    schemaVersion: Version

    model_config = ConfigDict(extra="ignore")
