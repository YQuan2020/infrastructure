1. 数据备份
   1. 物理数据
      1. TODO
   2. 逻辑数据（mongodump, mongorestore）
      1. mongodump 只dump数据，不dump索引，恢复时需要重建索引
      2. 备份数据
         1. 全量备份数据，无压缩
            ````
            mongodump -o dump
            ````
            产生数据如下
            ````
            // dump目录可以看到数据库对应的文件夹
            $ ls
            admin  dev  staging
            // 数据库数据备份文件
            $ ls staging
            Article.bson // 原数据
            Article.metadata.json // 元数据，包括索引（"indexes":[{"v":2,"key":{"_id":1},"name":"_id_","ns":"staging.PaymentConfig"}]）
            ...
            ````
            [**注意**] 由于导出的是类似json的k-v文件，所以文件体积会比原数据库大很多，注意磁盘空间的大小，适当选择dump方式
         2. 全量备份数据，压缩
            ````
            // 默认会并行跑4个collection，这里按照服务器的资源控制好并行的数量numParallelCollections，否则可能会占满cpu
            mongodump -o dump --gzip --numParallelCollections=1
            ````
            产生数据如下
            ````
            // dump目录可以看到数据库对应的文件夹
            $ ls
            admin  dev  staging
            // 数据库数据备份文件
            $ ls staging
            Article.bson.gz
            Article.metadata.json.gz
            ...
            ````
      3. 恢复数据
         1. 直接恢复（文件没有压缩过）
            ````
            // 将备份数据解压到dump文件夹
            mkdir dump
            mv dump.zip dump/
            cd dump
            unzip dump.zip
            cd ..
            mongorestore // 默认restore dump文件夹文件
            ````
         2. 恢复gzip文件（文件压缩过）
            ````
            // 同上
            mongorestore --gzip // 默认restore dump文件夹文件
            ```` 
        
           
      4. 重建索引
         
    
      5. 操作完别忘了把备份数据删除，把磁盘空间还给服务器，可能会用到的工具
            1. [Linux 下清空或删除大文件/大量文件的几种方法](https://blog.csdn.net/sd4493091/article/details/80414053)
            2. 其他查看磁盘空间命令
               ````
                //删除文件
                sudo rm -rf file

                // 查看文件大小
                ls -lht

                //查看硬盘空间
                df -h

                //可以查看每个文件夹的大小，此举可以快速定位大文件所存在的位置。
                du -sh /*

                //可查看当前目录下的文件和文件夹数
                ls |wc -l
               ````