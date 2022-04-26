---
id: three-ways-to-getting-variable-type
title: golang 获取变量类型的三种方式
---

# Using string formatting

```go
func typeof(v interface{}) string {
    return fmt.Sprintf("%T", v)
}
```

# Using reflect package
```go
func typeof(v interface{}) string {
    return reflect.TypeOf(v).String()
}
```

# Using type assertions
```go
func typeof(v interface{}) string {
    switch v.(type) {
    case int:
        return "int"
    case float64:
        return "float64"
    //... etc
    default:
        return "unknown"
    }
}
```
