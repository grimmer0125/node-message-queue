## prepare

install minikube: https://github.com/kubernetes/minikube#installation

## run steps

### start local k8s

`minikube start`

### build the local docker image, everytime the code is changed

1. `eval $(minikube docker-env)`
3. `docker build -t express-rabbit-rpc .`

### run k8s cluster including docker containers
`kubectl create -f pod-config.yaml`

### test
1. ~type `minikube ip` to get its ip.~
2. ~type `kubectl services` to know the mapping external ip of express server, port. e.g. `my-service10  NodePort 10.105.153.56 <none> 3000:31045/TCP`. 31045 is the port.~
3. ~use browsers to open ip:port, request root path of express server. Also open ip:port/rabbit to get the results from the rabbitmq + rpc server.~

Use one of the following to test 
1. `curl $(minikube service express-rabbit-service --url)`
2. `minikube service express-rabbit-service`, directly open the browser. 
3. use curl or browser to test the endpoint, `$(minikube service express-rabbit-service --url)/rabbit`

### stop k8s cluster and minikube
1. `kubectl delete -f pod-config.yaml`
2. `minikube stop`
