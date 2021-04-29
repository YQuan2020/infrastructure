#### 安装
[Install GitLab Runner](https://docs.gitlab.com/runner/install/)

#### gitlab 开启 ci configuration
project -> Settings -> General -> Visibility, project features, permissions -> Pipelines (打勾)

#### 注册
````
gitlab-runner register

Runtime platform                                    arch=amd64 os=darwin pid=65206 revision=8fa89735 version=13.6.0
WARNING: Running in user-mode.
WARNING: Use sudo for system-mode:
WARNING: $ sudo gitlab-runner...

Enter the GitLab instance URL (for example, https://gitlab.com/):
http://192.168.1.3/
Enter the registration token:
kn1qXu-XUZgdKuetWH2T
Enter a description for the runner:
[Ivans-Mac-mini-2.local]:
Enter tags for the runner (comma-separated):
ios-test
Registering runner... succeeded                     runner=kn1qXu-X
Enter an executor: docker, docker-ssh, parallels, shell, kubernetes, custom, ssh, virtualbox, docker+machine, docker-ssh+machine:
shell
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
````
**注册成功后，可以在Runners activated for this project看到对应的runner**

1. Specific Runners
2. Shared Runners
3. Group Runners
4. Set up a specific Runner manually
   1. token (Setting -> CI/CD -> Runners -> Set up a specific Runner manually -> Use the following registration token during setup:)
   2. tags runner的标签，可以根据标签，为某个stage设置对应runner
   3. 一个project可以有多个runner
   
#### 配置
````
// .gitlab-ci.yml
variables:
  GIT_SUBMODULE_STRATEGY: recursive # 获取本分支代码时，同时递归更新submodule
gs
stages:
  - test

test:
  stage: test
  script:
    - echo $(pwd)
    - echo $(ls)

  only:
    - feat-ci
  tags:
    - ios-test

````