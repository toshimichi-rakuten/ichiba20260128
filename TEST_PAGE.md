# テストページ作成ガイド

こちらのレポシトリーで作成してください。
https://git.rakuten-it.com/projects/ICWDCDG/repos/cwd-event-server/browse

## パス構成

https://stg.event.rakuten.co.jp/_jstest/ecm

### PCのみでチェックするページ

```
/_jstest/ecm/<release_date>/pc/<module_name>/index.html 
/_jstest/ecm/<release_date>/pc/<module_name>/index_left.html
/_jstest/ecm/<release_date>/pc/<module_name>/sp_index.html
/_jstest/ecm/<release_date>/pc/<module_name>/inc/module_01.html

```

### SPのみでチェックするページ

```
/_jstest/ecm/<release_date>/sp/<module_name>/index.html
/_jstest/ecm/<release_date>/sp/<module_name>/index_left.html
/_jstest/ecm/<release_date>/sp/<module_name>/sp_index.html
/_jstest/ecm/<release_date>/sp/<module_name>/inc/module_01.html
```

### PC/SP両方でチェックするページ

```
/_jstest/ecm/<release_date>/pcsp/<module_name>/index.html
/_jstest/ecm/<release_date>/pcsp/<module_name>/index_left.html
/_jstest/ecm/<release_date>/pcsp/<module_name>/sp_index.html
/_jstest/ecm/<release_date>/pcsp/<module_name>/inc/module_01.html
```

使え回しのテストページは`release_date`を`reuse`にしてください。

## INCの使用について

1. INCファイルはindexに近く置く事

### OK例

```
/_jstest/ecm/<release_date>/sp/<module_name>/index.html
/_jstest/ecm/<release_date>/sp/<module_name>/inc/module_01.html
```

### NG例

```
/_jstest/ecm/<release_date>/sp/<module_name>/index.html
/_jstest/hoge/hoge/inc/module_01.html
```

```
/_jstest/ecm/<release_date>/sp/<module_name>/index.html
/_jstest/ecm/<release_date>/sp/inc/module_01.html
```
