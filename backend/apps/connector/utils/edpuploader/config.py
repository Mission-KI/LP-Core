from dataclasses import dataclass


@dataclass(frozen=True)
class ElasticConfig:
    elastic_url: str
    elastic_index: str
    elastic_schema_index: str
    elastic_apikey: str | None
    elastic_timeout: float


@dataclass(frozen=True)
class S3Config:
    s3_access_key_id: str
    s3_secret_access_key: str
    s3_bucket_name: str
    s3_endpoint_url: str | None


@dataclass(frozen=True)
class UploadConfig(ElasticConfig, S3Config):
    pass
