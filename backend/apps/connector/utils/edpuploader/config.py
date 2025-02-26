from dataclasses import dataclass


@dataclass(frozen=True)
class ElasticConfig:
    elastic_url: str
    elastic_index: str
    elastic_apikey: str
    elastic_timeout: float = 10


@dataclass(frozen=True)
class S3Config:
    s3_access_key_id: str
    s3_secret_access_key: str
    s3_bucket_name: str


@dataclass(frozen=True)
class UploadConfig(ElasticConfig, S3Config):
    pass
