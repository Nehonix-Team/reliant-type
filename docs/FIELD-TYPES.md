# Field Types Reference

Complete guide to all field types available in ReliantType, with examples and constraints.

## 📚 Table of Contents

- [Basic Types](#basic-types)
- [Constrained Types](#constrained-types)
- [Format Validation](#format-validation)
- [Array Types](#array-types)
- [Union Types](#union-types)
- [Optional Types](#optional-types)
- [Literal Values](#literal-values)
- [Custom Patterns](#custom-patterns)
- [Special Types](#special-types)

## Basic Types

### String Type

```typescript
const StringSchema = Interface({
  // Basic string
  name: "string",

  // String with length constraints
  username: "string(3,20)", // 3-20 characters
  password: "string(8,)", // Minimum 8 characters
  code: "string(6,6)", // Exactly 6 characters
  description: "string(,500)", // Maximum 500 characters

  // Optional string
  nickname: "string?",
  bio: "string(,200)?",
});
```

**Constraint Syntax:**

- `string(min,max)` - Length between min and max
- `string(min,)` - Minimum length
- `string(,max)` - Maximum length
- `string(exact,exact)` - Exact length

### Number Type

```typescript
const NumberSchema = Interface({
  // Basic number
  age: "number",

  // Number with range constraints
  score: "number(0,100)", // Range 0-100
  price: "number(0.01,)", // Minimum 0.01
  discount: "number(,1.0)", // Maximum 1.0
  temperature: "number(-273.15,)", // Absolute zero minimum

  // Integer constraints
  count: "int", // Integer only
  positiveInt: "int(1,)", // Positive integer
  limitedInt: "int(0,1000)", // Integer range

  // Positive/negative shortcuts
  id: "positive", // Positive number
  debt: "negative", // Negative number

  // Optional number
  rating: "number(1,5)?",
});
```

**Constraint Syntax:**

- `number(min,max)` - Range between min and max
- `int` - Integer validation
- `positive` - Positive number (> 0)
- `negative` - Negative number (< 0)

### Boolean Type

```typescript
const BooleanSchema = Interface({
  // Basic boolean
  isActive: "boolean",

  // Optional boolean
  isVerified: "boolean?",

  // Boolean with smart conversion (strings "true"/"false")
  enableFeature: "boolean",
});
```

### Date Type

```typescript
const DateSchema = Interface({
  // Basic date
  createdAt: "date",

  // Optional date
  updatedAt: "date?",
  lastLogin: "date?",

  // Date validation accepts:
  // - Date objects
  // - ISO date strings
  // - Unix timestamps (numbers)
  birthday: "date",
  expiresAt: "date",
});
```

## Constrained Types

### String Constraints

```typescript
const StringConstraintsSchema = Interface({
  // Length constraints
  shortCode: "string(2,5)", // 2-5 characters
  longText: "string(100,)", // Minimum 100 characters
  tweet: "string(,280)", // Maximum 280 characters

  // Exact length
  countryCode: "string(2,2)", // Exactly 2 characters
  zipCode: "string(5,5)", // Exactly 5 characters

  // Combined with optional
  optionalCode: "string(3,10)?", // Optional, 3-10 chars if present
});
```

### Number Constraints

```typescript
const NumberConstraintsSchema = Interface({
  // Range constraints
  percentage: "number(0,100)", // 0-100
  probability: "number(0,1)", // 0-1
  temperature: "number(-50,50)", // -50 to 50

  // Open ranges
  minimumAge: "number(18,)", // 18 or higher
  maxDiscount: "number(,0.5)", // 0.5 or lower

  // Integer constraints
  pageNumber: "int(1,)", // Positive integer
  itemCount: "int(0,1000)", // 0-1000 integer

  // Special number types
  userId: "positive", // Any positive number
  balance: "number", // Any number (can be negative)
});
```

### Array Constraints

```typescript
const ArrayConstraintsSchema = Interface({
  // Basic arrays
  tags: "string[]", // Array of strings
  scores: "number[]", // Array of numbers
  flags: "boolean[]", // Array of booleans

  // Array size constraints
  limitedTags: "string[](1,5)", // 1-5 items
  minItems: "string[](2,)", // Minimum 2 items
  maxItems: "string[](,10)", // Maximum 10 items
  exactItems: "string[](3,3)", // Exactly 3 items

  // Optional arrays
  optionalTags: "string[]?", // Optional array
  limitedOptional: "string[](1,5)?", // Optional, 1-5 items if present

  // Nested constraints
  usernames: "string(3,20)[](1,100)", // Array of 3-20 char strings, 1-100 items
  ages: "int(0,120)[](,50)", // Array of 0-120 integers, max 50 items
});
```

## Format Validation

### Built-in Formats

```typescript
const FormatSchema = Interface({
  // Email validation
  email: "email",
  workEmail: "email?",

  // URL validation
  website: "url",
  avatar: "url?",

  // UUID validation
  id: "uuid",
  sessionId: "uuid?",

  // Phone validation (international format)
  phone: "phone",
  mobile: "phone?",

  // IP address validation
  serverIp: "ip",
  clientIp: "ip?",

  // JSON validation
  config: "json",
  metadata: "json?",

  // Hex color validation
  primaryColor: "hexcolor",
  accentColor: "hexcolor?",

  // Base64 validation
  encodedData: "base64",
  attachment: "base64?",

  // JWT validation
  authToken: "jwt",
  refreshToken: "jwt?",

  // Semantic version validation
  appVersion: "semver",
  minVersion: "semver?",
});
```

### URL Validation with Arguments

ReliantType provides powerful URL validation with specialized arguments for different use cases. Each URL argument enforces specific protocol and security restrictions.

#### Available URL Arguments

```typescript
const UrlSchema = Interface({
  // Basic URL validation (defaults to web protocols)
  website: "url",

  // HTTPS-only validation (most secure)
  secureApi: "url.https",
  paymentGateway: "url.https",

  // HTTP-only validation
  legacyEndpoint: "url.http",

  // Web protocols (HTTP + HTTPS)
  publicWebsite: "url.web",

  // Development mode (permissive for localhost/IPs)
  devServer: "url.dev",
  localApi: "url.dev",

  // FTP-only validation
  fileServer: "url.ftp",
  backupLocation: "url.ftp",

  // Optional URL arguments
  optionalWebsite: "url.https?",
  optionalApi: "url.web?",

  // URL arrays with arguments
  apiEndpoints: "url.https[]",
  devServers: "url.dev[](1,5)",
});
```

#### URL Argument Specifications

| Argument    | Protocols   | Localhost | Private IPs | Use Case              |
| ----------- | ----------- | --------- | ----------- | --------------------- |
| `url`       | HTTP, HTTPS | ❌        | ❌          | General web URLs      |
| `url.https` | HTTPS only  | ❌        | ❌          | Secure APIs, payments |
| `url.http`  | HTTP only   | ❌        | ❌          | Legacy systems        |
| `url.web`   | HTTP, HTTPS | ❌        | ❌          | Public websites       |
| `url.dev`   | HTTP, HTTPS | ✅        | ✅          | Development/testing   |
| `url.ftp`   | FTP only    | ❌        | ❌          | File transfers        |

#### Security Features

```typescript
const SecurityExamples = Interface({
  // ✅ HTTPS-only - blocks HTTP, localhost, IPs
  securePayment: "url.https",
  // Valid: "https://api.stripe.com/v1/charges"
  // Invalid: "http://api.stripe.com", "https://localhost:3000"

  // ✅ Development mode - allows localhost and IPs
  devEnvironment: "url.dev",
  // Valid: "http://localhost:3000", "https://192.168.1.100:8080"
  // Invalid: "ftp://files.example.com"

  // ✅ Web protocols - production-ready validation
  publicApi: "url.web",
  // Valid: "https://api.example.com", "http://legacy.example.com"
  // Invalid: "ftp://files.com", "https://localhost:3000"
});
```

#### Error Handling for Invalid Arguments

```typescript
// ❌ Invalid URL arguments throw clear errors
try {
  const InvalidSchema = Interface({
    badUrl: "url.invalid", // Invalid argument
  });
} catch (error) {
  console.log(error.message);
  // "Invalid URL argument: url.invalid. Valid arguments are: url.https, url.http, url.web, url.dev, url.ftp"
}

// ❌ Case-sensitive validation
try {
  const CaseSchema = Interface({
    badCase: "URL.HTTPS", // Wrong case
  });
} catch (error) {
  console.log("URL arguments are case-sensitive");
}
```

#### Real-World Examples

```typescript
const ECommerceSchema = Interface({
  // Payment processing (HTTPS required)
  paymentWebhook: "url.https",
  stripeEndpoint: "url.https",

  // Public website URLs
  companyWebsite: "url.web",
  socialMediaLinks: "url.web[]?",

  // Development configuration
  devApiUrl: "url.dev",
  testingEndpoints: "url.dev[](1,10)",

  // File storage
  ftpBackupServer: "url.ftp",
  assetCdnUrls: "url.https[]",
});

const MicroserviceSchema = Interface({
  // Service discovery
  authService: "url.https",
  userService: "url.https",

  // Internal communication (dev environment)
  internalServices: "url.dev[]",

  // External integrations
  thirdPartyApis: "url.https[]",
  webhookUrls: "url.https[](1,5)",
});
```

### Advanced Format Types

#### Hex Color Validation

```typescript
const ColorSchema = Interface({
  // Basic hex colors
  primaryColor: "hexcolor", // #RGB, #RRGGBB, #RRGGBBAA
  secondaryColor: "hexcolor?", // Optional color

  // Color arrays
  palette: "hexcolor[]", // Array of colors
  gradientColors: "hexcolor[](2,10)", // 2-10 colors

  // Examples of valid values:
  // "#F00", "#FF0000", "#FF0000FF"
  // "#abc", "#ABCDEF", "#12345678"
});
```

#### Base64 Validation

```typescript
const DataSchema = Interface({
  // Basic Base64
  encodedData: "base64",
  attachment: "base64?",

  // Base64 arrays
  files: "base64[]",
  images: "base64[](1,5)",

  // Examples of valid values:
  // "SGVsbG8gV29ybGQ="
  // "VGhpcyBpcyBhIHRlc3Q="
});
```

#### JWT (JSON Web Token) Validation

```typescript
const AuthSchema = Interface({
  // JWT tokens
  accessToken: "jwt",
  refreshToken: "jwt?",

  // JWT arrays
  tokens: "jwt[]",
  sessionTokens: "jwt[](1,3)",

  // Examples of valid values:
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
});
```

#### Semantic Version (SemVer) Validation

```typescript
const VersionSchema = Interface({
  // Semantic versions
  appVersion: "semver",
  minVersion: "semver?",

  // Version arrays
  supportedVersions: "semver[]",
  compatibleVersions: "semver[](1,10)",

  // Examples of valid values:
  // "1.0.0", "2.1.3", "1.0.0-alpha.1"
  // "1.2.3-beta.4+build.5"
});
```

### Custom Regex Patterns

```typescript
const RegexSchema = Interface({
  // US ZIP code
  zipCode: "string(/^\\d{5}(-\\d{4})?$/)",

  // Product code (2 letters + 4 digits)
  productCode: "string(/^[A-Z]{2}\\d{4}$/)",

  // Username (alphanumeric + underscore, 3-20 chars)
  username: "string(/^[a-zA-Z0-9_]{3,20}$/)",

  // Hex color code
  color: "string(/^#[0-9A-Fa-f]{6}$/)",

  // Credit card number (basic format)
  creditCard: "string(/^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$/)",

  // ISO country code
  country: "string(/^[A-Z]{2}$/)",

  // Semantic version
  version: "string(/^\\d+\\.\\d+\\.\\d+$/)",

  // Optional regex patterns
  optionalCode: "string(/^[A-Z]{3}\\d{3}$/)?",
});
```

## Array Types

### Basic Arrays

```typescript
const ArraySchema = Interface({
  // Simple arrays
  tags: "string[]",
  scores: "number[]",
  active: "boolean[]",
  dates: "date[]",

  // Optional arrays
  categories: "string[]?",
  ratings: "number[]?",

  // Empty arrays allowed by default
  emptyAllowed: "string[]", // Can be []
});
```

### Constrained Arrays

```typescript
const ConstrainedArraySchema = Interface({
  // Size constraints
  requiredTags: "string[](1,)", // At least 1 item
  limitedTags: "string[](1,10)", // 1-10 items
  maxTags: "string[](,5)", // Maximum 5 items
  exactTags: "string[](3,3)", // Exactly 3 items

  // Element constraints with array constraints
  usernames: "string(3,20)[](1,100)", // 1-100 usernames, each 3-20 chars
  ages: "int(0,120)[](,50)", // Max 50 ages, each 0-120
  emails: "email[](1,10)", // 1-10 email addresses
  urls: "url[](,5)", // Max 5 URLs

  // Complex nested constraints
  productCodes: "string(/^[A-Z]{2}\\d{4}$/)[](1,)", // At least 1 valid product code
});
```

### Nested Arrays

```typescript
const NestedArraySchema = Interface({
  // Array of objects
  users: {
    id: "uuid",
    name: "string",
    email: "email"
  }[],

  // Array of arrays
  matrix: "number[][]",
  coordinates: "number[](2,2)[]",  // Array of coordinate pairs

  // Optional nested arrays
  optionalMatrix: "number[][]?",
  groups: "string[][]?"
});
```

## Union Types

### Basic Unions

```typescript
const UnionSchema = Interface({
  // String unions
  status: "active|inactive|pending",
  role: "admin|user|guest|moderator",
  theme: "light|dark|auto",

  // Number unions
  priority: "1|2|3|4|5",
  version: "1.0|2.0|3.0",

  // Mixed type unions
  id: "string|number",
  value: "string|number|boolean",

  // Optional unions
  optionalStatus: "active|inactive?",
  optionalValue: "string|number?",
});
```

### Complex Unions

```typescript
const ComplexUnionSchema = Interface({
  // Union with constraints
  identifier: "string(3,)|number(1,)", // String 3+ chars OR number 1+

  // Union with formats
  contact: "email|phone", // Email OR phone number

  // Union with arrays
  data: "string[]|number[]", // Array of strings OR numbers

  // Union with regex
  code: "string(/^[A-Z]{3}$/)|string(/^\\d{6}$/)", // 3 letters OR 6 digits

  // Nested unions in objects
  config: {
    mode: "development|staging|production",
    debug: "boolean|string",
    port: "number|string",
  },
});
```

## Optional Types

### Basic Optional

```typescript
import { NehoID as ID } from "nehoid";

const OptionalSchema = Interface({
  // Required fields
  id: "uuid",
  name: "string",

  // Optional fields (can be undefined)
  nickname: "string?",
  bio: "string?",
  avatar: "url?",

  // Optional with constraints
  age: "number(0,120)?",
  tags: "string[](1,10)?",

  // Optional nested objects
  profile: {
    firstName: "string?",
    lastName: "string",
    middleName: "string?", // Optional within nested object
  },
});

const profile = {
  lastName: "Eleazar",
};

const result = OptionalSchema.safeParse({
  id: ID.uuid(),
  age: 1000,
  name: "Seth",
  profile,
});

if (result.success) {
  console.log("✅ Expected success:", result.data);
} else {
  console.log("❌ Unexpected errors:", result.errors);
}
```

### Optional vs Nullable

```typescript
const OptionalVsNullableSchema = Interface({
  // Optional - can be undefined, not present in object
  optionalField: "string?",

  // Nullable - must be present, can be null
  nullableField: "string|null",

  // Both optional and nullable
  flexibleField: "string|null?",

  // Array variations
  optionalArray: "string[]?", // Array can be undefined
  nullableArray: "string[]|null", // Array can be null
  arrayOfOptional: "string?[]", // Array of optional strings
});
```

## Literal Values

### Constant Values

```typescript
const LiteralSchema = Interface({
  // String literals
  type: "=user", // Must be exactly "user"
  version: "=2.0", // Must be exactly "2.0"

  // Number literals
  apiVersion: "=1", // Must be exactly 1
  maxRetries: "=3", // Must be exactly 3

  // Boolean literals
  isEnabled: "=true", // Must be exactly true
  isLegacy: "=false", // Must be exactly false

  // Complex literals
  config: '={"theme":"dark"}', // Must be exact object
  tags: '=["default","user"]', // Must be exact array

  // Optional literals
  optionalType: "=admin?", // Optional, but if present must be "admin"
});
```

## Custom Patterns

### Advanced Regex

```typescript
const AdvancedPatternSchema = Interface({
  // Complex email pattern
  corporateEmail: "string(/^[a-zA-Z0-9._%+-]+@company\\.com$/)",

  // Strong password pattern
  strongPassword:
    "string(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/)",

  // International phone
  internationalPhone: "string(/^\\+[1-9]\\d{1,14}$/)",

  // Social security number
  ssn: "string(/^\\d{3}-\\d{2}-\\d{4}$/)",

  // License plate (US format)
  licensePlate: "string(/^[A-Z]{1,3}[0-9]{1,4}$/)",

  // MAC address
  macAddress: "string(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)",

  // IP address
  ipv4: "ip", // or use a custom patterns

  //JWT token validation
  isJWT: "jwt", // or custom can be also use

  //sem version
  version: "semver" // custom could be use

  //b64 test
  isB64: "base64", // use custom if you want

  //json test
  isJson: "json",

  //hexcolor validation
  isHexC: "hexcolor", // use custom if want

  // Credit card (Luhn algorithm not included)
  creditCardNumber:
    "string(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/)",
});
```

## Special Types

### Any Type

```typescript
const AnyTypeSchema = Interface({
  // Any type (use sparingly)
  metadata: "any",
  config: "any?",

  // Better alternatives when possible
  stringOrNumber: "string|number", // Prefer unions
  jsonData: "json", // Prefer JSON validation

  // Any in arrays
  mixedArray: "any[]",
  optionalMixed: "any[]?",
});
```

### Nested Objects

```typescript
const NestedSchema = Interface({
  user: {
    id: "uuid",
    profile: {
      name: "string",
      contact: {
        email: "email",
        phone: "phone?",
        address: {
          street: "string",
          city: "string",
          country: "string(2,2)",
          zipCode: "string(/^\\d{5}(-\\d{4})?$/)"
        }?
      }
    }
  },

  // Optional nested objects
  settings: {
    theme: "light|dark",
    notifications: {
      email: "boolean",
      push: "boolean"
    }
  }?
});
```

## 🎯 Best Practices

### Type Selection Guidelines

1. **Use specific types over generic ones**

   ```typescript
   // ✅ Good
   email: "email",
   age: "int(0,120)",

   // ❌ Avoid
   email: "string",
   age: "number"
   ```

2. **Prefer constraints over validation logic**

   ```typescript
   // ✅ Good
   username: "string(3,20)",

   // ❌ Avoid (handle in business logic instead)
   username: "string"
   ```

3. **Use unions for known values**

   ```typescript
   // ✅ Good
   status: "active|inactive|pending",

   // ❌ Avoid
   status: "string"
   ```

4. **Be explicit with optional fields**

   ```typescript
   // ✅ Good - clear intent
   nickname: "string?",
   bio: "string(,500)?",

   // ❌ Unclear
   nickname: "string|undefined"
   ```

### Performance Tips

1. **Simple types are faster than complex regex**
2. **Built-in formats are optimized**
3. **Union types with fewer options perform better**
4. **Array constraints are validated efficiently**

## 🔗 Related Documentation

- **[Getting Started](./GETTING-STARTED.md)** - Basic usage and setup
- **[Conditional Validation](./CONDITIONAL-VALIDATION.md)** - Advanced business logic
- **[Examples Collection](./EXAMPLES.md)** - Real-world usage patterns
- **[Quick Reference](./QUICK-REFERENCE.md)** - Syntax cheat sheet
