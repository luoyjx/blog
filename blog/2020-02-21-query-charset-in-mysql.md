---
slug: query-charset-in-mysql
title: mysql 查询某个库、表、列的字符集 charset
tags: [mysql]
---

# 数据库
```sql
SELECT default_character_set_name FROM information_schema.SCHEMATA
WHERE schema_name = "schemaname";
```

# 表
```sql
SELECT CCSA.character_set_name FROM information_schema.`TABLES` T,
       information_schema.`COLLATION_CHARACTER_SET_APPLICABILITY` CCSA
WHERE CCSA.collation_name = T.table_collation
  AND T.table_schema = "schemaname"
  AND T.table_name = "tablename";
```

# 列
```sql
SELECT character_set_name FROM information_schema.`COLUMNS`
WHERE table_schema = "schemaname"
  AND table_name = "tablename"
  AND column_name = "columnname";
```
