# SESC mini-app
The app for [SESC](https://lyceum.urfu.ru/) urfu which was created to get timetable and marks via mobile devices. 

##Installation and start
For installation you need node js.

1. Change directory to "frontend" and use this command:
```bash
npm i
```
2. Than change directory to "server" and use this commands:
```bash
npm i
```
```bash
npm run build
```
3 (optional). If you want to use SSL: add folder "ssl" with "privateKey.pem" and "certificate.pem"
to "server" and set these variables: 
```bash
export PORT=443
```
```
export IsSSL=true
```
4. Start server in "server" folder:
```bash
npm run start
```

## Contributing
If you're interested in contributing, please read our contributing docs before submitting a pull request.

## Docs
All the docs are as simple as possible, all what you need to contribute\
is to follow the checklist below.

### Preflight checklist
- [ ] **Manual testing** has been performed according to the acceptance criteria.
- [ ] **Unit testing** and/or end-to-end testing has got covered.
- [ ] **Style checking** has been performed, and your code is using google [typescript coding convention](https://google.github.io/styleguide/tsguide.html).