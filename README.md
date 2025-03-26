# Daseen

## Project Overview

**Daseen** (Dataspace Search Engine) is a powerful and efficient search engine
designed to search for Extended Dataset Profiles (EDPs). These profiles are
generated from various assets (e.g., CSVs, PDFs) using the distributed EDP
service.

Daseen is built with a JavaScript-based web UI and a Python backend.

### Components

The project consists of the following components:

- **Frontend**: Provides the search UI with filtering capabilities and detailed views for selected EDPs.
- **Landing Page**: Displays an overview of dataspaces, publishers, and their assigned categories.
- **Backend**: Built with Python and the Django Rest Framework (DRF). It includes:
  - A **connector interface** for uploading and managing EDPs.
  - A **search interface** for retrieving published EDP information, primarily used by the frontend.
  - A **monitoring interface** for tracking activities related to specific dataspaces.

## Usage

To run the project, we recommend using the local Docker Compose setup as located in the repository's root folder.

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Start the development environment with:

```sh
docker compose -f local.yml up -d --build
```

Once running, access the following:

- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **API Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Contributing

We welcome contributions! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```sh
   git checkout -b feature-branch
   ```

3. Make your changes.
4. Commit your changes:

   ```sh
   git commit -m "Add some feature"
   ```

5. Push to the branch:

   ```sh
   git push origin feature-branch
   ```

6. Open a pull request.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
