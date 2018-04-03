#!/usr/bin/env bash

# start docker for testing
# # docker run -p 3000:3000 -ti grimmer0125/express-rabbit:latest

# start k8s
# minikube start.
# kubectl run express-rabbit-pod --image-pull-policy=Never --image=grimmer0125/express-rabbit:latest --port=3000
# or kubectl create -f pod-config.yaml
# or kubectl create -f deployment.yaml --record

# to build and use the resulted docker image in minikube
# eval $(minikube docker-env)

# make docker image
# docker build -t grimmer0125/express-rabbit .

# into its shell for tesing
# export POD_NAME=express-rabbit-pod-7469d7b866-qd7ck (deployment name + someid)
# kubectl exec -ti $POD_NAME bash
# curl localhost:3000

# add the service: https://kubernetes.io/docs/getting-started-guides/minikube/
# kubectl expose deployment express-rabbit-pod --type=NodePort  <-should be ok
# kubectl expose deployment express-rabbit-pod --type=NodePort --port 3000
# kubectl expose pod, ref: https://kubernetes-v1-4.github.io/docs/user-guide/kubectl/kubectl_expose/
# curl $(minikube service express-rabbit-pod --url) e.g. http://192.168.99.100:32560
# 192.168.99.100 is minikube ip
# curl $(minikube ip):$NODE_PORT
# kubectl exec -ti $POD_NAME curl localhost:8080

# https://kubernetes.io/docs/tutorials/kubernetes-basics/expose-interactive/
# minikube does not support the LoadBalancer option yet)
