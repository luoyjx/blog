---
id: create-composite-primary-key-error-using-gorm-in-go
title: gorm 在创建联合主键时遇到 Incorrect table definition 错误
---

比如遇到

```go
type SentNotification struct {
	PushNotificationID string `gorm:"primary_key"`
	GroupID          int64  `gorm:"primary_key"`
	UserID           int64  `gorm:"primary_key"`
}

```

定义如上类型，需要定义联合主键时，会遇到下面的错误：

```go
Error 1075: Incorrect table definition; there can be only one auto column and it must be defined as a key
```

这时可以按照如下方式解决

```go
type AccountOwner struct {
    AccountID    uint    `gorm:"primary_key" sql:"type:INT(10) UNSIGNED NOT NULL"`
    ExternalOwnerID    string    `gorm:"primary_key"`
    InternalOwnerID    uint    `gorm:"primary_key" sql:"type:INT(10) UNSIGNED NOT NULL"`
}
```

使用 `sql` tag 来指定创建列时的语句。

参考链接

https://github.com/jinzhu/gorm/issues/1595
