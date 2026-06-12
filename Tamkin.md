---
title: Tamkin
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# Tamkin

This Postman collection is the central API reference for the Tamkin platform. It covers all endpoints for authentication, campaign management, donation payments, and media reels.

The collection is structured by feature module to reflect the backend architecture, making it easy for frontend developers to integrate.

Designed for:
- Client application integration
- API testing and payload validation
- QA and automated test pipelines

Base URLs:

# Authentication

# 0.System

## GET Health Check

GET /

Checks that the server is running and reachable.

**Expected User Data**
None

> Response Examples

> 200 Response

```json
{
    "message": "Operation successful",
    "statusCode": 200,
    "data": {
        "hero": {
            "title": "Tamkin Foundation",
            "slogan": "Because hope cannot be amputated.",
            "cta_text": "Join Us"
        },
        "about": {
            "title": "Who We Are",
            "description": "Tamkin Foundation is an emerging humanitarian initiative led by Gaza war amputees, dedicated to meeting the needs of amputees in Gaza. We do not speak about pain from the outside—we carry it in our bodies and know every detail of it: the pain of surgery, the trauma of loss, the difficulty of the first step, and the heavy feeling of becoming a burden. But we believe that injury does not end a person; it can rebuild them stronger when opportunities are available. From this belief, Tamkin was born."
        },
        "why_tamkin": {
            "title": "Why Tamkin?",
            "before": [
                "A suitable prosthetic limb",
                "Medical and psychological rehabilitation",
                "Social and professional support",
                "Ongoing care that preserves dignity"
            ],
            "gaza_reality": {
                "amputees_count": 5000,
                "issues": [
                    "Without prosthetic limbs",
                    "Without adequate rehabilitation",
                    "Without stable income",
                    "Without psychological or social support"
                ]
            },
            "summary": "We do not see them as numbers; we see untapped potential waiting for an opportunity."
        },
        "mission": {
            "title": "Our Mission",
            "items": [
                "Support the provision of prosthetic limbs and related needs",
                "Contribute to medical and psychological rehabilitation",
                "Launch vocational empowerment programs that ensure a dignified source of income",
                "Build a sustainable humanitarian support network that restores hope and creates empowerment"
            ],
            "statement": "We do not offer temporary charity; we work to restore ability and dignity."
        },
        "features": {
            "title": "What Makes Us Different",
            "items": [
                "The foundation is led by amputees who have lived the experience in every detail",
                "Deep understanding of real needs, not theoretical ones",
                "Full transparency in presenting cases and support",
                "Direct communication between supporters and beneficiaries"
            ],
            "statement": "This is not a relationship between donor and recipient, but between two people united in building hope."
        },
        "stories": {
            "title": "Stories from Reality",
            "founders": [
                {
                    "name": "Saeed Amer Al-Ramlawi",
                    "role": "Founder",
                    "location": "Gaza - Shuja'iyya",
                    "image": "/pictures/Saeed.png",
                    "story": "I was raised in a humble family that valued education and serving others. During the war, I lost 25 family members, including my father, brother, and sister, after the tower we had taken shelter in was bombed. I survived beneath the rubble, then was later injured while distributing aid, which ultimately led to the amputation of my foot. I realized then that losing a limb is not just an injury—it is the loss of part of your independence and daily life. Even so, I held on to one truth: hope cannot be amputated. Today, I carry the voice of more than 5,000 amputees inside Gaza."
                },
                {
                    "name": "Adeeb Al-Madhoun",
                    "role": "Co-Founder Assistant",
                    "location": "Gaza",
                    "image": "/pictures/Adeeb.png",
                    "story": "I was a hardworking student striving for excellence until the war began and changed everything. While shopping, I was caught in an airstrike and woke up in the hospital facing a difficult choice: amputate my arm or attempt to save it with enormous costs and a risk of death. I chose amputation. I woke up the next day without an arm, and it was one of the hardest moments of my life. Later, I received a simple plastic arm that helped me continue. But the more than 5,000 amputees in Gaza are still constantly on my mind, and I hope to play a role in serving them."
                }
            ]
        },
        "partnership": {
            "title": "Why Your Partnership Matters",
            "items": [
                "Because a prosthetic limb is not just a tool, but the beginning of returning to life",
                "Because rehabilitation is not only medical care, but the restoration of self-confidence",
                "Because your support today may create a story of recovery told tomorrow"
            ],
            "statement": "We are not asking for passing sympathy, but for a true partnership in creating impact."
        },
        "closing": {
            "text": "Together, we can turn pain into ability, loss into strength, and injury into a new beginning. Join us... because hope cannot be amputated."
        }
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» hero|object|true|none||none|
|»»» title|string|true|none||none|
|»»» slogan|string|true|none||none|
|»»» cta_text|string|true|none||none|
|»» about|object|true|none||none|
|»»» title|string|true|none||none|
|»»» description|string|true|none||none|
|»» why_tamkin|object|true|none||none|
|»»» title|string|true|none||none|
|»»» before|[string]|true|none||none|
|»»» gaza_reality|object|true|none||none|
|»»»» amputees_count|integer|true|none||none|
|»»»» issues|[string]|true|none||none|
|»»» summary|string|true|none||none|
|»» mission|object|true|none||none|
|»»» title|string|true|none||none|
|»»» items|[string]|true|none||none|
|»»» statement|string|true|none||none|
|»» features|object|true|none||none|
|»»» title|string|true|none||none|
|»»» items|[string]|true|none||none|
|»»» statement|string|true|none||none|
|»» stories|object|true|none||none|
|»»» title|string|true|none||none|
|»»» founders|[object]|true|none||none|
|»»»» name|string|true|none||none|
|»»»» role|string|true|none||none|
|»»»» location|string|true|none||none|
|»»»» image|string|true|none||none|
|»»»» story|string|true|none||none|
|»» partnership|object|true|none||none|
|»»» title|string|true|none||none|
|»»» items|[string]|true|none||none|
|»»» statement|string|true|none||none|
|»» closing|object|true|none||none|
|»»» text|string|true|none||none|

# Auth/Login & Session Management

## POST Login with Google

POST /auth/google

Authenticates or registers a user via a Google ID token. Sets session cookies on success. Returns a `status` field indicating whether the user was logged in or newly registered.

**Expected User Data**
`id_token` (string) – Required, Google OAuth2 ID token obtained from the client

> Body Parameters

```json
{
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» id_token|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Register

POST /auth/register

Creates a new user account. Sets session cookies on success.

**Expected User Data**
`fullName` (string) – Required, full name of the user
`email` (string) – Required, valid email address
`password` (string) – Required, strong password
`confirmPassword` (string) – Required, must exactly match `password`
`nationality` (string) – Required, user's nationality

> Body Parameters

```json
{
    "fullName": "Ahmad Al-Masri",
    "email": "ahmad@example.com",
    "password": "StrongPass@123",
    "confirmPassword": "StrongPass@123",
    "nationality": "PS"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» fullName|body|string| yes |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|
|» confirmPassword|body|string| yes |none|
|» nationality|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Login

POST /auth/login

Authenticates an existing user with email and password. Sets session cookies on success.

**Expected User Data**
`email` (string) – Required, registered email address
`password` (string) – Required, account password

> Body Parameters

```json
{
    "email": "admin@tamkin.com",
    "password": "AdminPassword123!"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» email|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> 200 Response

```json
{
    "message": "Logged in successfully",
    "info": "Credentials saved in cookies successfully",
    "statusCode": 200,
    "data": {
        "user": {
            "_id": 1,
            "uuid": "dda3b2c5-205e-4bbf-a751-543a3ba15ebd",
            "firstName": "Ahmad",
            "lastName": "Al-Masri",
            "email": "ahmad@example.com",
            "emailVerified": false,
            "provider": "system",
            "password": "$2b$10$NAfbup.DopQCQbDGwRjGreW7qvhSWWgDEFtvQIQs.tjNxXoyxcePK",
            "picture": null,
            "role": "user",
            "nationality": "State of Palestine",
            "createdAt": "2026-06-12T03:06:07.233Z",
            "updatedAt": "2026-06-12T03:06:07.233Z",
            "fullName": "Ahmad Al-Masri"
        }
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» info|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» user|object|true|none||none|
|»»» _id|integer|true|none||none|
|»»» uuid|string|true|none||none|
|»»» firstName|string|true|none||none|
|»»» lastName|string|true|none||none|
|»»» email|string|true|none||none|
|»»» emailVerified|boolean|true|none||none|
|»»» provider|string|true|none||none|
|»»» password|string|true|none||none|
|»»» picture|null|true|none||none|
|»»» role|string|true|none||none|
|»»» nationality|string|true|none||none|
|»»» createdAt|string|true|none||none|
|»»» updatedAt|string|true|none||none|
|»»» fullName|string|true|none||none|

## POST Logout

POST /auth/logout

Clears session cookies and terminates the active session.

**Expected User Data**
None – Relies on the session cookie sent by the browser.

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Auth/Email Verification

## POST Request Confirm Email

POST /auth/request-confirm-email

Sends an OTP code to the authenticated user's email to begin the email verification flow. Requires an active session.

**Expected User Data**
None – The authenticated user is identified from the session cookie.

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Confirm Email

POST /auth/confirm-email

Verifies the user's email using the OTP received from `/auth/request-confirm-email`. Requires an active session.

**Expected User Data**
`code` (string) – Required, the OTP code sent to the user's email

> Body Parameters

```json
{
    "code": "A3F9B2"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» code|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Campaign/Campaign Retrieval

## GET Get All Campaigns

GET /campaign

Returns a list of all active campaigns. Public endpoint — no authentication required.

**Expected User Data**
None

> Response Examples

> 200 Response

```json
{
    "message": "Operation successful",
    "statusCode": 200,
    "data": [
        {
            "uuid": "4216981b-11df-4675-a1a2-2d79c3f649ca",
            "title": "capitulus amor ipsa",
            "description": "Condico antea statua vulgus eligendi ante cunae tantillus. Cibus damno comburo verus. Absorbeo curvo corpus uter impedit temptatio sed desino cornu sapiente.",
            "target_amount": "87304.26",
            "current_amount": "33277.39",
            "slug": "coepi-magni-audacia-17812450566880",
            "image": [
                "https://picsum.photos/seed/mF7J27RgK/2190/2061"
            ],
            "status": "ACTIVE",
            "created_at": "2026-06-12T03:17:36.670Z",
            "updated_at": "2026-06-12T03:17:36.670Z",
            "deleted_at": null
        },
        {
            "uuid": "3ceef691-147c-48ce-b9d1-1454343e7985",
            "title": "vix strues vinitor",
            "description": "Ea bardus cauda aggero. Voluptatibus corroboro calamitas tutamen pauci tutamen. Desidero vicissitudo tabesco barba abutor tricesimus quis rem velut.",
            "target_amount": "26778.28",
            "current_amount": "1503.07",
            "slug": "color-arbor-veritatis-17812450566994",
            "image": [
                "https://picsum.photos/seed/TTdfyDfO/3643/3741"
            ],
            "status": "ACTIVE",
            "created_at": "2026-06-12T03:17:36.681Z",
            "updated_at": "2026-06-12T03:17:36.681Z",
            "deleted_at": null
        }
    ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|[object]|true|none||none|
|»» uuid|string|true|none||none|
|»» title|string|true|none||none|
|»» description|string|true|none||none|
|»» target_amount|string|true|none||none|
|»» current_amount|string|true|none||none|
|»» slug|string|true|none||none|
|»» image|[string]|true|none||none|
|»» status|string|true|none||none|
|»» created_at|string|true|none||none|
|»» updated_at|string|true|none||none|
|»» deleted_at|null|true|none||none|

## GET Get Campaign By ID

GET /campaign/{CAMPAIGN_ID}

Retrieves a single campaign by its UUID. Returns the content in the appropriate language based on the request context.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target campaign

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|CAMPAIGN_ID|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Campaign/Campaign Management

## POST Create Campaign

POST /campaign

Creates a new donation campaign. Requires an authenticated session with ADMIN or SUPER_ADMIN role.

**Expected User Data**
`title` (object, multilingual) – Required, e.g. `{ "en": "Help Gaza", "ar": "ساعد غزة" }`
`description` (object, multilingual) – Required, campaign description per supported language
`target_amount` (number) – Required, fundraising goal (min: 1, max 2 decimal places)
`current_amount` (number) – Optional, amount already raised (min: 0)
`images` (file[]) – Optional, one or more image files using field key `images`

> Body Parameters

```yaml
"title[en]": Help Gaza
"title[ar]": ساعد غزة
"description[en]": Support families in Gaza with essential aid
"description[ar]": دعم الأسر في غزة بالمساعدات الأساسية
target_amount: "50000"
current_amount: "0"
images: "null"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title[en]|body|string| yes |none|
|» title[ar]|body|string| yes |none|
|» description[en]|body|string| yes |none|
|» description[ar]|body|string| yes |none|
|» target_amount|body|string| yes |none|
|» current_amount|body|string| yes |none|
|» images|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{"message":"Campaign created successfully","statusCode":201,"data":{"uuid":"b01b107a-505b-41d9-b528-852c3fdb6684","title":{"en":"Help Gaza","ar":"ساعد غزة"},"description":{"en":"Support families in Gaza with essential aid","ar":"دعم الأسر في غزة بالمساعدات الأساسية"},"target_amount":50000,"current_amount":"0.00","slug":"help-gaza","image":[],"status":"DRAFT","created_at":"2026-06-12T03:27:13.464Z","updated_at":"2026-06-12T03:27:13.464Z","deleted_at":null}}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» uuid|string|true|none||none|
|»» title|object|true|none||none|
|»»» en|string|true|none||none|
|»»» ar|string|true|none||none|
|»» description|object|true|none||none|
|»»» en|string|true|none||none|
|»»» ar|string|true|none||none|
|»» target_amount|integer|true|none||none|
|»» current_amount|string|true|none||none|
|»» slug|string|true|none||none|
|»» image|[string]|true|none||none|
|»» status|string|true|none||none|
|»» created_at|string|true|none||none|
|»» updated_at|string|true|none||none|
|»» deleted_at|null|true|none||none|

## PUT Update Campaign

PUT /campaign/{CAMPAIGN_ID}

Updates an existing campaign. All fields are optional — only provided fields will be updated. Requires ADMIN or SUPER_ADMIN role.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target campaign
`title` (object, multilingual) – Optional, updated title per language
`description` (object, multilingual) – Optional, updated description per language
`target_amount` (number) – Optional, updated fundraising goal
`current_amount` (number) – Optional, updated amount raised
`images` (file[]) – Optional, replacement image files using field key `images`

> Body Parameters

```yaml
"title[en]": Help Gaza – Updated
target_amount: "75000"

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|CAMPAIGN_ID|path|string| yes |none|
|body|body|object| no |none|
|» title[en]|body|string| yes |none|
|» target_amount|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## DELETE Delete Campaign

DELETE /campaign/{CAMPAIGN_ID}

Soft-deletes a campaign by UUID. Requires ADMIN or SUPER_ADMIN role.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target campaign

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|CAMPAIGN_ID|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PATCH Restore Campaign

PATCH /campaign/restore/{CAMPAIGN_ID}

Restores a previously soft-deleted campaign back to active state. Requires ADMIN or SUPER_ADMIN role.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target campaign

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|CAMPAIGN_ID|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PATCH Approve Campaign

PATCH /campaign/approve/{CAMPAIGN_ID}

Approves a campaign, making it publicly visible. Requires SUPER_ADMIN role only.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target campaign

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|CAMPAIGN_ID|path|string| yes |none|

> Response Examples

> 200 Response

```json
{
    "message": "Campaign approved successfully",
    "statusCode": 200,
    "data": {
        "uuid": "984b8415-c1c0-46bb-b8eb-75cec760cbeb",
        "title": {
            "ar": "11ساعد غزة",
            "en": "Help Gaza11"
        },
        "description": {
            "ar": "دعم الأسر في غزة بالمساعدات الأساسية",
            "en": "Support families in Gaza with essential aid"
        },
        "target_amount": "50000.00",
        "current_amount": "0.00",
        "slug": "help-gaza11",
        "image": [],
        "status": "ACTIVE",
        "created_at": "2026-06-12T03:28:28.615Z",
        "updated_at": "2026-06-12T03:28:35.495Z",
        "deleted_at": null
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» uuid|string|true|none||none|
|»» title|object|true|none||none|
|»»» ar|string|true|none||none|
|»»» en|string|true|none||none|
|»» description|object|true|none||none|
|»»» ar|string|true|none||none|
|»»» en|string|true|none||none|
|»» target_amount|string|true|none||none|
|»» current_amount|string|true|none||none|
|»» slug|string|true|none||none|
|»» image|[string]|true|none||none|
|»» status|string|true|none||none|
|»» created_at|string|true|none||none|
|»» updated_at|string|true|none||none|
|»» deleted_at|null|true|none||none|

# Payment/Payment Operations

## POST Create Payment

POST /payments/create

Initiates a donation payment for a campaign. Works for both authenticated users and guests (guest checkout).

**Expected User Data**
`campaignUuid` (string) – Required, UUID of the target campaign
`amount` (number) – Required, donation amount (min: 1)
`currency` (string) – Optional, currency code. Default: `USD`
`provider` (string, enum) – Required, one of: `STRIPE`, `PAYMOB`, `FAWRY`

> Body Parameters

```json
{
    "campaignUuid": "4216981b-11df-4675-a1a2-2d79c3f649ca",
    "amount": 50,
    "currency": "USD",
    "provider": "STRIPE"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» campaignUuid|body|string| yes |none|
|» amount|body|integer| yes |none|
|» currency|body|string| yes |none|
|» provider|body|string| yes |none|

> Response Examples

> 200 Response

```json
{
    "message": "Payment initiated successfully. Please complete your payment.",
    "statusCode": 201,
    "data": {
        "sessionId": "mock_session_1781245231828_6956e585-d7a8-4ce7-81f0-f7de215b656c",
        "checkoutUrl": "https://mock-stripe-checkout.com/pay/mock_session_1781245231828_6956e585-d7a8-4ce7-81f0-f7de215b656c"
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» sessionId|string|true|none||none|
|»» checkoutUrl|string|true|none||none|

## POST Webhook Handler

POST /payments/webhook/PROVIDER

Receives and processes payment status updates from a payment provider. This endpoint is called by the provider — NOT by the frontend.

**Expected User Data**
`provider` (string) – Required route parameter, e.g. `stripe`, `paymob`, `fawry`
Headers – Provider-specific signature header (e.g. `stripe-signature` for Stripe)
Body – Raw payload as sent by the payment provider

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|stripe-signature|header|string| yes |Required for Stripe. Other providers use their own signature headers.|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Mock Webhook (Dev Only)

POST /payments/mock-webhook/{PROVIDER}

Simulates a provider webhook event for local development and testing. Do NOT expose or call this in production.

**Expected User Data**
`provider` (string) – Required route parameter, e.g. `stripe`, `paymob`, `fawry`
Body – Any mock payload matching the provider's webhook event format

> Body Parameters

```json
{
    "type": "payment_intent.succeeded",
    "data": {
        "object": {
            "id": "pi_test_123",
            "metadata": {
                "paymentUuid": "{{PAYMENT_ID}}"
            }
        }
    }
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|PROVIDER|path|string| yes |none|
|body|body|object| no |none|
|» type|body|string| yes |none|
|» data|body|object| yes |none|
|»» object|body|object| yes |none|
|»»» id|body|string| yes |none|
|»»» metadata|body|object| yes |none|
|»»»» paymentUuid|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get Payment By ID

GET /payments/{PAYMENT_ID}

Retrieves the details and current status of a payment record by its ID.

**Expected User Data**
`id` (string) – Required route parameter, the payment ID or UUID

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|PAYMENT_ID|path|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Reels/Reels Retrieval

## GET Get All Reels

GET /reels

Returns a paginated list of all reels.

**Expected User Data**
`page` (number) – Optional, page number. Default: `1`
`limit` (number) – Optional, results per page. Default: `10`, Max: `100`

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|string| yes |none|
|limit|query|string| yes |none|

> Response Examples

> 200 Response

```json
{
    "message": "Reels fetched successfully",
    "statusCode": 200,
    "data": {
        "data": [
            {
                "uuid": "78947a9a-c1b9-4fa9-a7d2-3a3ea2c9a620",
                "fileName": "video_14.mp4",
                "fileUrl": "https://radiant-volleyball.com/",
                "title": "Comparo argumentum asper summopere possimus appositus.",
                "content": "Odit demo accusator cauda pax blandior aequus aspicio. Amitto mollitia acidus. Delectatio consequuntur cilicium convoco voluptate.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.712Z",
                "updatedAt": "2026-06-12T03:17:36.712Z"
            },
            {
                "uuid": "09595710-c213-42c1-b5ca-cdd012801fa8",
                "fileName": "video_13.mp4",
                "fileUrl": "https://deadly-reporter.biz/",
                "title": "Officiis arx tricesimus angustus amita pel adipisci aequitas centum.",
                "content": "Verbum vir armarium. Admitto crudelis acerbitas defetiscor vulnero aedificium crebro valde dolores cui. Attero vulnus comes cattus degusto trado bellum.",
                "user": {
                    "_id": 3,
                    "uuid": "c7a46a54-e14e-4c8d-8da7-4322e786a2b6",
                    "firstName": "Augustine",
                    "lastName": "Bernhard",
                    "email": "Ronnie_MacGyver-Bailey5@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$m2safXXtdQXMbnB9Ao0Mze1Ew8f901FB8kZx4clNIIjliYp1vA6yy",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.011Z",
                    "updatedAt": "2026-06-12T03:17:36.011Z",
                    "fullName": "Augustine Bernhard"
                },
                "createdAt": "2026-06-12T03:17:36.711Z",
                "updatedAt": "2026-06-12T03:17:36.711Z"
            },
            {
                "uuid": "0e4603f6-6809-4d45-b7c5-cd6cf811cebc",
                "fileName": "video_12.mp4",
                "fileUrl": "https://unsightly-hippodrome.org",
                "title": "Arbor sursum cedo utrimque delego.",
                "content": "Thesis victus vulgo suffoco clarus. Creo tres sopor cuius viriliter vorago consectetur demitto. Cauda tutis causa pax.",
                "user": {
                    "_id": 9,
                    "uuid": "f2a7dc7a-5f25-4467-8048-e15beae9d4b5",
                    "firstName": "Andre",
                    "lastName": "Ritchie",
                    "email": "Amos87@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$t7pq5v8UMa6SWn33pon.4OrJbJ.vzEqMO/7jVPYWTqSNntLnpzKZe",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.449Z",
                    "updatedAt": "2026-06-12T03:17:36.449Z",
                    "fullName": "Andre Ritchie"
                },
                "createdAt": "2026-06-12T03:17:36.709Z",
                "updatedAt": "2026-06-12T03:17:36.709Z"
            },
            {
                "uuid": "a8e30866-ca9d-48a5-bbe8-62e419fdb539",
                "fileName": "video_11.mp4",
                "fileUrl": "https://yellow-resolve.org",
                "title": "Conscendo perspiciatis ascisco ubi tripudio creta sapiente tero.",
                "content": "Cupiditas iusto volaticus conatus cultura appositus pariatur utrum doloribus. Et aufero conor tripudio valetudo sulum ustilo sumptus advenio. Consuasor calcar in denuncio ambulo doloribus arca numquam ambitus comparo.",
                "user": {
                    "_id": 11,
                    "uuid": "b2b230f9-b143-4cdf-9b7a-ce88c023b55d",
                    "firstName": "Rosemarie",
                    "lastName": "Hilpert-Hettinger",
                    "email": "Felicia_Macejkovic@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$xutKtYaW4Ipe06alXivIzeIwMxX7t5hYC7hGtRXMQeO4ld2g6kZnu",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.597Z",
                    "updatedAt": "2026-06-12T03:17:36.597Z",
                    "fullName": "Rosemarie Hilpert-Hettinger"
                },
                "createdAt": "2026-06-12T03:17:36.707Z",
                "updatedAt": "2026-06-12T03:17:36.707Z"
            },
            {
                "uuid": "ee382942-5be4-48ee-b3ac-cf5b3674730a",
                "fileName": "video_10.mp4",
                "fileUrl": "https://right-pleasure.info",
                "title": "Succurro cunabula sto ante pecco beatus spectaculum pecto aeger comedo.",
                "content": "Utrimque aperte cresco circumvenio bestia suffragium celer verus cernuus. Cunctatio vobis vergo neque. Aqua clamo umbra eligendi advenio tergeo charisma balbus officia.",
                "user": {
                    "_id": 4,
                    "uuid": "e2c26ee8-fc78-4b64-a1a2-bec523b27fd8",
                    "firstName": "Chet",
                    "lastName": "Ernser",
                    "email": "Myron_Langworth@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$Q2i47yl2sASwYlyq4Z1emO/oz1DcPJuMcS0easO7l3vbfibNdl1BS",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.085Z",
                    "updatedAt": "2026-06-12T03:17:36.085Z",
                    "fullName": "Chet Ernser"
                },
                "createdAt": "2026-06-12T03:17:36.704Z",
                "updatedAt": "2026-06-12T03:17:36.704Z"
            },
            {
                "uuid": "c1bf9ee4-20cf-4d8b-9fc7-7112fde99226",
                "fileName": "video_9.mp4",
                "fileUrl": "https://trained-starboard.org",
                "title": "Strenuus reiciendis rem soluta.",
                "content": "Tracto ipsa verbum sordeo atqui via. Cariosus suus placeat abstergo candidus vorax appositus surgo. Barba quasi curis solus iusto creator ducimus.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.698Z",
                "updatedAt": "2026-06-12T03:17:36.698Z"
            },
            {
                "uuid": "f0283f13-5853-4fa3-be35-ae6a6142b5be",
                "fileName": "video_8.mp4",
                "fileUrl": "https://fussy-comparison.net",
                "title": "Quia vomito vae vinco.",
                "content": "Coniecto tantum cohors culpo officiis deludo temperantia valetudo. Stips cicuta tot laudantium vinculum quo spectaculum virtus. Tamdiu correptius angelus caelum.",
                "user": {
                    "_id": 4,
                    "uuid": "e2c26ee8-fc78-4b64-a1a2-bec523b27fd8",
                    "firstName": "Chet",
                    "lastName": "Ernser",
                    "email": "Myron_Langworth@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$Q2i47yl2sASwYlyq4Z1emO/oz1DcPJuMcS0easO7l3vbfibNdl1BS",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.085Z",
                    "updatedAt": "2026-06-12T03:17:36.085Z",
                    "fullName": "Chet Ernser"
                },
                "createdAt": "2026-06-12T03:17:36.697Z",
                "updatedAt": "2026-06-12T03:17:36.697Z"
            },
            {
                "uuid": "b4b87c9a-860a-468c-a1f3-47534d4eae92",
                "fileName": "video_7.mp4",
                "fileUrl": "https://frightened-fog.net",
                "title": "Nulla subiungo eos terminatio coadunatio tactus advoco creo brevis.",
                "content": "Patrocinor adfectus desino torqueo. Cariosus creptio concido stultus uberrime crinis. Amicitia coniecto charisma agnitio.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.696Z",
                "updatedAt": "2026-06-12T03:17:36.696Z"
            },
            {
                "uuid": "3587f1f2-c9a3-4529-8688-f2f24e576556",
                "fileName": "video_6.mp4",
                "fileUrl": "https://calculating-disadvantage.biz/",
                "title": "Dedecor harum territo vergo apto timidus.",
                "content": "Amplexus corrupti ventus. Deleo defleo apto aiunt. Comedo careo ex repellendus candidus.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.694Z",
                "updatedAt": "2026-06-12T03:17:36.694Z"
            },
            {
                "uuid": "288db105-acc4-4948-957d-53877f07934a",
                "fileName": "video_5.mp4",
                "fileUrl": "https://snarling-defendant.info/",
                "title": "Tredecim appositus concido ab.",
                "content": "Cedo crapula tantillus quidem cornu caelestis averto adiuvo. Sopor comptus quisquam summa canto vulpes autem crux vito dedecor. Amet suscipio attonbitus studio ter totam.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.692Z",
                "updatedAt": "2026-06-12T03:17:36.692Z"
            }
        ],
        "meta": {
            "totalItems": 15,
            "itemCount": 10,
            "totalPages": 2,
            "currentPage": 1
        }
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» data|[object]|true|none||none|
|»»» uuid|string|true|none||none|
|»»» fileName|string|true|none||none|
|»»» fileUrl|string|true|none||none|
|»»» title|string|true|none||none|
|»»» content|string|true|none||none|
|»»» user|object|true|none||none|
|»»»» _id|integer|true|none||none|
|»»»» uuid|string|true|none||none|
|»»»» firstName|string|true|none||none|
|»»»» lastName|string|true|none||none|
|»»»» email|string|true|none||none|
|»»»» emailVerified|boolean|true|none||none|
|»»»» provider|string|true|none||none|
|»»»» password|string|true|none||none|
|»»»» picture|null|true|none||none|
|»»»» role|string|true|none||none|
|»»»» nationality|null|true|none||none|
|»»»» createdAt|string|true|none||none|
|»»»» updatedAt|string|true|none||none|
|»»»» fullName|string|true|none||none|
|»»» createdAt|string|true|none||none|
|»»» updatedAt|string|true|none||none|
|»» meta|object|true|none||none|
|»»» totalItems|integer|true|none||none|
|»»» itemCount|integer|true|none||none|
|»»» totalPages|integer|true|none||none|
|»»» currentPage|integer|true|none||none|

## GET Search Reels

GET /reels/search

Searches reels by title, content, or uploader. Returns paginated results.

**Expected User Data**
`title` (string) – Optional, filter by reel title
`content` (string) – Optional, filter by reel caption or description
`uploadedBy` (string) – Optional, filter by uploader name or ID
`page` (number) – Optional, page number. Default: `1`
`limit` (number) – Optional, results per page. Default: `10`, Max: `100`

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|string| yes |none|
|limit|query|string| yes |none|
|title|query|string| no |none|
|content|query|string| no |none|
|uploadedBy|query|string| no |none|

> Response Examples

> 200 Response

```json
{
    "message": "Reels fetched successfully",
    "statusCode": 200,
    "data": {
        "data": [
            {
                "uuid": "78947a9a-c1b9-4fa9-a7d2-3a3ea2c9a620",
                "fileName": "video_14.mp4",
                "fileUrl": "https://radiant-volleyball.com/",
                "title": "Comparo argumentum asper summopere possimus appositus.",
                "content": "Odit demo accusator cauda pax blandior aequus aspicio. Amitto mollitia acidus. Delectatio consequuntur cilicium convoco voluptate.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.712Z",
                "updatedAt": "2026-06-12T03:17:36.712Z"
            },
            {
                "uuid": "09595710-c213-42c1-b5ca-cdd012801fa8",
                "fileName": "video_13.mp4",
                "fileUrl": "https://deadly-reporter.biz/",
                "title": "Officiis arx tricesimus angustus amita pel adipisci aequitas centum.",
                "content": "Verbum vir armarium. Admitto crudelis acerbitas defetiscor vulnero aedificium crebro valde dolores cui. Attero vulnus comes cattus degusto trado bellum.",
                "user": {
                    "_id": 3,
                    "uuid": "c7a46a54-e14e-4c8d-8da7-4322e786a2b6",
                    "firstName": "Augustine",
                    "lastName": "Bernhard",
                    "email": "Ronnie_MacGyver-Bailey5@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$m2safXXtdQXMbnB9Ao0Mze1Ew8f901FB8kZx4clNIIjliYp1vA6yy",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.011Z",
                    "updatedAt": "2026-06-12T03:17:36.011Z",
                    "fullName": "Augustine Bernhard"
                },
                "createdAt": "2026-06-12T03:17:36.711Z",
                "updatedAt": "2026-06-12T03:17:36.711Z"
            },
            {
                "uuid": "0e4603f6-6809-4d45-b7c5-cd6cf811cebc",
                "fileName": "video_12.mp4",
                "fileUrl": "https://unsightly-hippodrome.org",
                "title": "Arbor sursum cedo utrimque delego.",
                "content": "Thesis victus vulgo suffoco clarus. Creo tres sopor cuius viriliter vorago consectetur demitto. Cauda tutis causa pax.",
                "user": {
                    "_id": 9,
                    "uuid": "f2a7dc7a-5f25-4467-8048-e15beae9d4b5",
                    "firstName": "Andre",
                    "lastName": "Ritchie",
                    "email": "Amos87@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$t7pq5v8UMa6SWn33pon.4OrJbJ.vzEqMO/7jVPYWTqSNntLnpzKZe",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.449Z",
                    "updatedAt": "2026-06-12T03:17:36.449Z",
                    "fullName": "Andre Ritchie"
                },
                "createdAt": "2026-06-12T03:17:36.709Z",
                "updatedAt": "2026-06-12T03:17:36.709Z"
            },
            {
                "uuid": "a8e30866-ca9d-48a5-bbe8-62e419fdb539",
                "fileName": "video_11.mp4",
                "fileUrl": "https://yellow-resolve.org",
                "title": "Conscendo perspiciatis ascisco ubi tripudio creta sapiente tero.",
                "content": "Cupiditas iusto volaticus conatus cultura appositus pariatur utrum doloribus. Et aufero conor tripudio valetudo sulum ustilo sumptus advenio. Consuasor calcar in denuncio ambulo doloribus arca numquam ambitus comparo.",
                "user": {
                    "_id": 11,
                    "uuid": "b2b230f9-b143-4cdf-9b7a-ce88c023b55d",
                    "firstName": "Rosemarie",
                    "lastName": "Hilpert-Hettinger",
                    "email": "Felicia_Macejkovic@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$xutKtYaW4Ipe06alXivIzeIwMxX7t5hYC7hGtRXMQeO4ld2g6kZnu",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.597Z",
                    "updatedAt": "2026-06-12T03:17:36.597Z",
                    "fullName": "Rosemarie Hilpert-Hettinger"
                },
                "createdAt": "2026-06-12T03:17:36.707Z",
                "updatedAt": "2026-06-12T03:17:36.707Z"
            },
            {
                "uuid": "ee382942-5be4-48ee-b3ac-cf5b3674730a",
                "fileName": "video_10.mp4",
                "fileUrl": "https://right-pleasure.info",
                "title": "Succurro cunabula sto ante pecco beatus spectaculum pecto aeger comedo.",
                "content": "Utrimque aperte cresco circumvenio bestia suffragium celer verus cernuus. Cunctatio vobis vergo neque. Aqua clamo umbra eligendi advenio tergeo charisma balbus officia.",
                "user": {
                    "_id": 4,
                    "uuid": "e2c26ee8-fc78-4b64-a1a2-bec523b27fd8",
                    "firstName": "Chet",
                    "lastName": "Ernser",
                    "email": "Myron_Langworth@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$Q2i47yl2sASwYlyq4Z1emO/oz1DcPJuMcS0easO7l3vbfibNdl1BS",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.085Z",
                    "updatedAt": "2026-06-12T03:17:36.085Z",
                    "fullName": "Chet Ernser"
                },
                "createdAt": "2026-06-12T03:17:36.704Z",
                "updatedAt": "2026-06-12T03:17:36.704Z"
            },
            {
                "uuid": "c1bf9ee4-20cf-4d8b-9fc7-7112fde99226",
                "fileName": "video_9.mp4",
                "fileUrl": "https://trained-starboard.org",
                "title": "Strenuus reiciendis rem soluta.",
                "content": "Tracto ipsa verbum sordeo atqui via. Cariosus suus placeat abstergo candidus vorax appositus surgo. Barba quasi curis solus iusto creator ducimus.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.698Z",
                "updatedAt": "2026-06-12T03:17:36.698Z"
            },
            {
                "uuid": "f0283f13-5853-4fa3-be35-ae6a6142b5be",
                "fileName": "video_8.mp4",
                "fileUrl": "https://fussy-comparison.net",
                "title": "Quia vomito vae vinco.",
                "content": "Coniecto tantum cohors culpo officiis deludo temperantia valetudo. Stips cicuta tot laudantium vinculum quo spectaculum virtus. Tamdiu correptius angelus caelum.",
                "user": {
                    "_id": 4,
                    "uuid": "e2c26ee8-fc78-4b64-a1a2-bec523b27fd8",
                    "firstName": "Chet",
                    "lastName": "Ernser",
                    "email": "Myron_Langworth@yahoo.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$Q2i47yl2sASwYlyq4Z1emO/oz1DcPJuMcS0easO7l3vbfibNdl1BS",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.085Z",
                    "updatedAt": "2026-06-12T03:17:36.085Z",
                    "fullName": "Chet Ernser"
                },
                "createdAt": "2026-06-12T03:17:36.697Z",
                "updatedAt": "2026-06-12T03:17:36.697Z"
            },
            {
                "uuid": "b4b87c9a-860a-468c-a1f3-47534d4eae92",
                "fileName": "video_7.mp4",
                "fileUrl": "https://frightened-fog.net",
                "title": "Nulla subiungo eos terminatio coadunatio tactus advoco creo brevis.",
                "content": "Patrocinor adfectus desino torqueo. Cariosus creptio concido stultus uberrime crinis. Amicitia coniecto charisma agnitio.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.696Z",
                "updatedAt": "2026-06-12T03:17:36.696Z"
            },
            {
                "uuid": "3587f1f2-c9a3-4529-8688-f2f24e576556",
                "fileName": "video_6.mp4",
                "fileUrl": "https://calculating-disadvantage.biz/",
                "title": "Dedecor harum territo vergo apto timidus.",
                "content": "Amplexus corrupti ventus. Deleo defleo apto aiunt. Comedo careo ex repellendus candidus.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.694Z",
                "updatedAt": "2026-06-12T03:17:36.694Z"
            },
            {
                "uuid": "288db105-acc4-4948-957d-53877f07934a",
                "fileName": "video_5.mp4",
                "fileUrl": "https://snarling-defendant.info/",
                "title": "Tredecim appositus concido ab.",
                "content": "Cedo crapula tantillus quidem cornu caelestis averto adiuvo. Sopor comptus quisquam summa canto vulpes autem crux vito dedecor. Amet suscipio attonbitus studio ter totam.",
                "user": {
                    "_id": 10,
                    "uuid": "3ef7a7c6-f86f-4f1a-aeb3-899d873bfcee",
                    "firstName": "Odie",
                    "lastName": "Cummerata",
                    "email": "Kiarra.Schoen99@hotmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$RrTwjXWsLyllr2SN.JQu1ufKzFZwNNl69slQ/4dVcoNwBoHwtdLQW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.523Z",
                    "updatedAt": "2026-06-12T03:17:36.523Z",
                    "fullName": "Odie Cummerata"
                },
                "createdAt": "2026-06-12T03:17:36.692Z",
                "updatedAt": "2026-06-12T03:17:36.692Z"
            }
        ],
        "meta": {
            "totalItems": 15,
            "itemCount": 10,
            "totalPages": 2,
            "currentPage": 1
        }
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» data|[object]|true|none||none|
|»»» uuid|string|true|none||none|
|»»» fileName|string|true|none||none|
|»»» fileUrl|string|true|none||none|
|»»» title|string|true|none||none|
|»»» content|string|true|none||none|
|»»» user|object|true|none||none|
|»»»» _id|integer|true|none||none|
|»»»» uuid|string|true|none||none|
|»»»» firstName|string|true|none||none|
|»»»» lastName|string|true|none||none|
|»»»» email|string|true|none||none|
|»»»» emailVerified|boolean|true|none||none|
|»»»» provider|string|true|none||none|
|»»»» password|string|true|none||none|
|»»»» picture|null|true|none||none|
|»»»» role|string|true|none||none|
|»»»» nationality|null|true|none||none|
|»»»» createdAt|string|true|none||none|
|»»»» updatedAt|string|true|none||none|
|»»»» fullName|string|true|none||none|
|»»» createdAt|string|true|none||none|
|»»» updatedAt|string|true|none||none|
|»» meta|object|true|none||none|
|»»» totalItems|integer|true|none||none|
|»»» itemCount|integer|true|none||none|
|»»» totalPages|integer|true|none||none|
|»»» currentPage|integer|true|none||none|

## GET Get Reel By ID

GET /reels/REEL_ID

Retrieves a single reel record by its UUID.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target reel

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get Reels By User ID

GET /reels/user/{USER_ID}

Returns all reels uploaded by a specific user. Paginated.

**Expected User Data**
`userId` (string) – Required route parameter, valid UUID of the target user
`page` (number) – Optional, page number. Default: `1`
`limit` (number) – Optional, results per page. Default: `10`, Max: `100`

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|USER_ID|path|string| yes |none|
|page|query|string| yes |none|
|limit|query|string| yes |none|

> Response Examples

> 200 Response

```json
{
    "message": "Reels fetched successfully",
    "statusCode": 200,
    "data": {
        "data": [
            {
                "uuid": "78947a9a-c1b9-4fa9-a7d2-3a3ea2c9a620",
                "fileName": "video_14.mp4",
                "fileUrl": "https://radiant-volleyball.com/",
                "title": "Comparo argumentum asper summopere possimus appositus.",
                "content": "Odit demo accusator cauda pax blandior aequus aspicio. Amitto mollitia acidus. Delectatio consequuntur cilicium convoco voluptate.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.712Z",
                "updatedAt": "2026-06-12T03:17:36.712Z"
            },
            {
                "uuid": "3587f1f2-c9a3-4529-8688-f2f24e576556",
                "fileName": "video_6.mp4",
                "fileUrl": "https://calculating-disadvantage.biz/",
                "title": "Dedecor harum territo vergo apto timidus.",
                "content": "Amplexus corrupti ventus. Deleo defleo apto aiunt. Comedo careo ex repellendus candidus.",
                "user": {
                    "_id": 7,
                    "uuid": "d17a3c7f-54e8-441a-86a1-cf3f9c784106",
                    "firstName": "Marshall",
                    "lastName": "Berge",
                    "email": "Osbaldo.Rohan48@gmail.com",
                    "emailVerified": true,
                    "provider": "system",
                    "password": "$2b$10$eR.iYGz.5i5pc6kVb9x3s.yxZNVQHGqEHEgcC6PjzEYSzZClwGreW",
                    "picture": null,
                    "role": "user",
                    "nationality": null,
                    "createdAt": "2026-06-12T03:17:36.305Z",
                    "updatedAt": "2026-06-12T03:17:36.305Z",
                    "fullName": "Marshall Berge"
                },
                "createdAt": "2026-06-12T03:17:36.694Z",
                "updatedAt": "2026-06-12T03:17:36.694Z"
            }
        ],
        "meta": {
            "totalItems": 2,
            "itemCount": 2,
            "totalPages": 1,
            "currentPage": 1
        }
    }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» message|string|true|none||none|
|» statusCode|integer|true|none||none|
|» data|object|true|none||none|
|»» data|[object]|true|none||none|
|»»» uuid|string|true|none||none|
|»»» fileName|string|true|none||none|
|»»» fileUrl|string|true|none||none|
|»»» title|string|true|none||none|
|»»» content|string|true|none||none|
|»»» user|object|true|none||none|
|»»»» _id|integer|true|none||none|
|»»»» uuid|string|true|none||none|
|»»»» firstName|string|true|none||none|
|»»»» lastName|string|true|none||none|
|»»»» email|string|true|none||none|
|»»»» emailVerified|boolean|true|none||none|
|»»»» provider|string|true|none||none|
|»»»» password|string|true|none||none|
|»»»» picture|null|true|none||none|
|»»»» role|string|true|none||none|
|»»»» nationality|null|true|none||none|
|»»»» createdAt|string|true|none||none|
|»»»» updatedAt|string|true|none||none|
|»»»» fullName|string|true|none||none|
|»»» createdAt|string|true|none||none|
|»»» updatedAt|string|true|none||none|
|»» meta|object|true|none||none|
|»»» totalItems|integer|true|none||none|
|»»» itemCount|integer|true|none||none|
|»»» totalPages|integer|true|none||none|
|»»» currentPage|integer|true|none||none|

# Reels/Reels Management

## DELETE Delete Reel

DELETE /reels/REEL_ID

Deletes a reel by its UUID. Requires ADMIN or SUPER_ADMIN role.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target reel

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Upload Reel

POST /reels/upload

Uploads a video reel. Requires ADMIN or SUPER_ADMIN role. Accepted formats: mp4, mkv, webm, avi, mov, m4v. Max file size: 100 MB.

**Expected User Data**
`file` (file) – Required, video file using field key `file`
`title` (string) – Optional, title of the reel
`content` (string) – Optional, description or caption of the reel

> Body Parameters

```yaml
file: file:///Users/pluto/Desktop/Screenshot 2026-06-07 at 1.07.33 PM.png
title: Gaza Today
content: A short update from the field.

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» file|body|string(binary)| yes |Required. Video file (mp4, mkv, webm, avi, mov, m4v). Max size: 100MB.|
|» title|body|string| yes |none|
|» content|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## PUT Update Reel

PUT /reels/update/REEL_ID

Updates the metadata of an existing reel. All fields are optional. Requires ADMIN or SUPER_ADMIN role.

**Expected User Data**
`id` (string) – Required route parameter, valid UUID of the target reel
`title` (string) – Optional, updated reel title
`content` (string) – Optional, updated reel description or caption

> Body Parameters

```json
{
    "title": "Gaza Today – Updated",
    "content": "Updated caption for this reel."
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» title|body|string| yes |none|
|» content|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

