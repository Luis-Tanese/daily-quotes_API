Absolutely! Here's a clean and professional **API documentation** for your app:

---

# **Daily Quote API Documentation**

The Daily Quote API allows users to fetch motivational quotes, either for a specific date or at random, with optional language translation. It includes the following endpoints:

---

## **Base URL**

```
https://daily-quotes-api.vercel.app/
```

---

## **Endpoints**

### 1. **Get Quote by Date**

Fetch a motivational quote for a specific date.

#### **Endpoint**

```
GET https://daily-quotes-api.vercel.app/api/daily-quote
```

#### **Query Parameters**

| Parameter | Type   | Required | Description                                                  |
| --------- | ------ | -------- | ------------------------------------------------------------ |
| `date`    | String | No       | The date for which you want the quote. Format: `YYYY-MM-DD`. |
| `lang`    | String | No       | The language code for translation (e.g., `es` for Spanish).  |

#### **Example Request**

```bash
GET https://daily-quotes-api.vercel.app/api/daily-quote?date=2024-12-18&lang=es
```

#### **Example Response**

```json
{
    "quote": "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.",
    "author": "Charles R. Swindoll",
    "language": "es"
}
```

#### **Example Request**

```bash
GET https://daily-quotes-api.vercel.app/api/daily-quote?lang=pt
```

#### **Example Response**

```json
{
    "quote": "O segredo de avançar é começar.",
    "author": "Mark Twain",
    "language": "pt"
}
```

#### **Error Responses**

-   **400 Bad Request**: If `date` is invalid.
    ```json
    {
        "error": "Invalid date format."
    }
    ```
-   **500 Internal Server Error**: If translation fails.
    ```json
    {
        "error": "Translation failed. Check the language code and try again."
    }
    ```

---

### 2. **Get Random Quote**

Fetch a random motivational quote.

#### **Endpoint**

```
GET https://daily-quotes-api.vercel.app/api/random-quote
```

#### **Query Parameters**

| Parameter | Type   | Required | Description                                                |
| --------- | ------ | -------- | ---------------------------------------------------------- |
| `lang`    | String | No       | The language code for translation (e.g., `fr` for French). |

#### **Example Request**

```bash
GET /api/random-quote?lang=fr
```

#### **Example Response**

```json
{
    "quote": "La meilleure façon de prédire l'avenir est de le créer.",
    "author": "Peter Drucker",
    "language": "fr"
}
```

#### **Error Responses**

-   **500 Internal Server Error**: If translation fails.
    ```json
    {
        "error": "Translation failed. Check the language code and try again."
    }
    ```

---

## **General Notes**

1. **Supported Language Codes**:

    - The `lang` parameter accepts ISO 639-1 language codes (e.g., `en` for English, `es` for Spanish, `fr` for French).
    - Default language is English (`en`) if the `lang` parameter is omitted.

2. **Date Validation**:

    - The `date` parameter must follow the `YYYY-MM-DD` format. Invalid dates will return a `400 Bad Request`.

3. **Translation Notes**:
    - Translations are handled via `google-translate-api-x`. If the language code is invalid or unsupported, the API will return an error.

---

## **Examples Using cURL**

### Fetch Quote by Date:

```bash
curl -X GET "https://daily-quotes-api.vercel.app/api/daily-quote?date=2024-12-18"
```

### Fetch Random Quote:

```bash
curl -X GET "https://daily-quotes-api.vercel.app/api/random-quote"
```
