# 참고

https://angular.kr/guide/schematics-authoring

# 프로젝트 생성

```
//전역설치
npm install -g @angular-devkit/schematics-cli
```

```
//첫시작시 --name 에는 프로젝트명과 첫 생성기의 이름이 들어갑니다.
schematics blank --name=generator
```

```
cd generator
npm install
npm run build
code .
```

# 추가시

```
cd generator
schematics <스키매틱-프로젝트-경로>:<스키매틱-이름> --<필수-옵션>=<값>
```

# 실행시

해당내역 폴더에 진입하여
schematics ../generator/:nestjs-prisma-graphql-crud --name=Order --drt-run=false

