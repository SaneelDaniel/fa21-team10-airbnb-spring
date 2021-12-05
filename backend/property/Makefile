all: clean

clean:
	gradle clean

compile:
	gradle build

test:
	gradle test

jar: 
	gradle build -x test
	gradle bootJar

run: jar
	echo Starting Spring at:  http://localhost:8080
	java -jar build/libs/property-1.0.jar

# Docker

docker-build: jar
	docker build -t property .
	docker images

docker-run: docker-build
	docker run --name property -td -p 80:8080 property	
	docker ps

docker-clean:
	docker stop property
	docker rm property
	docker rmi property

docker-shell:
	docker exec -it property bash 

docker-push:
	docker login
	docker build -t $(account)/property:v1 -t $(account)/property:v1 .
	docker push $(account)/property:v1 

# Compose

network-ls:
	docker network ls 

network-create:
	docker network create --driver bridge property-v1_network

network-prune:
	docker network prune

compose-up:
	docker-compose up --scale gumball=2 -d

compose-down:
	docker-compose down 	

lb-stats:
	echo "user = admin | password = admin"
	open http://localhost:1936

lb-test:
	open http://localhost


# Pod

pod-run:
	kubectl apply -f pod.yaml

pod-list:
	kubectl get pods

pod-desc:
	kubectl describe pods property

pod-delete:
	kubectl delete -f pod.yaml

pod-shell:
	kubectl exec -it property -- /bin/bash

pod-logs:
	kubectl logs -f property

# Deployment

deployment-create:
	kubectl create -f deployment.yaml --save-config 

deployment-get:
	kubectl get deployments

deployment-get-pods:
	kubectl get pods -l name=property

deployment-pod-shell:
	kubectl exec -it $(pod) -- /bin/bash

deployment-upgrade:
	kubectl apply  -f deployment.yaml

deployment-delete:
	kubectl delete deployment property-deployment

# Service

service-create:
	kubectl create -f service.yaml

service-get:
	kubectl get services

service-get-ip:
	kubectl get service property -o wide

service-delete:
	kubectl delete service property

# Ingress

ingress-apply:
	kubectl apply -f ingress.yaml

ingress-ip:
	kubectl get ingress property-ingress


# Jumpbox Setup & Testing

init-jumpbox:
	docker run --network property_network --name jumpbox -t -d ubuntu