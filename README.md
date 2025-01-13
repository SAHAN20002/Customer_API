## How to Run This Project

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the project:**
    ```sh
    npm start
    ```

4. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

5. **Enjoy the project!**

For any issues, please refer to the [documentation](./docs) or contact the maintainer.

## API Endpoints

### List of Routes

1. **GET /api/items**
    - **Description:** Retrieve a list of items.
    - **Response Format:**
        ```json
        {
            "items": [
                {
                    "id": "1",
                    "name": "Item 1",
                    "description": "Description of Item 1"
                },
                {
                    "id": "2",
                    "name": "Item 2",
                    "description": "Description of Item 2"
                }
            ]
        }
        ```

2. **POST /api/items**
    - **Description:** Create a new item.
    - **Request Body:**
        ```json
        {
            "name": "New Item",
            "description": "Description of the new item"
        }
        ```
    - **Response Format:**
        ```json
        {
            "id": "3",
            "name": "New Item",
            "description": "Description of the new item"
        }
        ```

3. **GET /api/items/{id}**
    - **Description:** Retrieve a specific item by ID.
    - **Response Format:**
        ```json
        {
            "id": "1",
            "name": "Item 1",
            "description": "Description of Item 1"
        }
        ```

4. **PUT /api/items/{id}**
    - **Description:** Update a specific item by ID.
    - **Request Body:**
        ```json
        {
            "name": "Updated Item",
            "description": "Updated description of the item"
        }
        ```
    - **Response Format:**
        ```json
        {
            "id": "1",
            "name": "Updated Item",
            "description": "Updated description of the item"
        }
        ```

5. **DELETE /api/items/{id}**
    - **Description:** Delete a specific item by ID.
    - **Response Format:**
        ```json
        {
            "message": "Item deleted successfully"
        }
        ```

        