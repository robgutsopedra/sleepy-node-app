# New Relic
## Formas de enviar app-info

### [newrelic.js file](newrelic.js)
1. Por favor no commitear el license_key
2. La diferenciación entre apps se produce en app_name

### [newrelic sidecar](task-definition-with-newrelic-sidecar.json)
1. Tenéis en el fichero del título un ejemplo - pero es simplemente añadir un sidecar al container de la app
2. Ofrece mucha menos información - incluidos tiempos de endpoints, que no aparece
3. A cambio tags y metadatos me parecen más fáciles de enviar

## Endpoints disponibles para probar
1. {lb_dns}:3000/api/v1/takes1second
2. {lb_dns}:3000/api/v1/takes5seconds
3. {lb_dns}:3000/api/v1/takes20seconds
4. {lb_dns}:3000/api/v1/takes0seconds
5. {lb_dns}:3000/api/v1/dummyInfo
6. {lb_dns}:3000/api/v1/dummyError
7. {lb_dns}:3000/api/v1/health


## Formas de obtener meta-data de la app en ecs 
*PISTA: Tenéis en el arranque de la app toda la información de ambos endpoints, del metadatafile, y escupe _todo_ por logs. 
### Metadata file
1. Fichero situado en /var/lib/ecs/data/metadata/cluster_name/task_id/container_name/ -- por ejemplo /var/lib/ecs/data/metadata/dummy-cluster-ec2/0038882b0cc54b9488aeb11a9214acdd/sleepy-app
2. Contiene bastante información, ejemplo:
```
{
	"Cluster": "dummy-cluster-ec2",
	"ContainerInstanceARN": "arn:aws:ecs:us-east-1:647336185665:container-instance/dummy-cluster-ec2/43cd4c8423cf4dca894f3bccfc3dcc2c",
	"TaskARN": "arn:aws:ecs:us-east-1:647336185665:task/dummy-cluster-ec2/0038882b0cc54b9488aeb11a9214acdd",
	"TaskDefinitionFamily": "first-run-task-definition",
	"TaskDefinitionRevision": "7",
	"ContainerID": "90d66ec6d373779bff9d3c18c78a29f9b194c92d8dcd1bcc7f569ec4172f0717",
	"ContainerName": "sleepy-app",
	"DockerContainerName": "/ecs-first-run-task-definition-7-sleepy-app-c094c0d1a5b1e9975e00",
	"ImageID": "sha256:a8edb9304fc85ca1b0f459b156ec21cbf664f8b62303d76a4c6fe25dbcde3eb8",
	"ImageName": "647336185665.dkr.ecr.us-east-1.amazonaws.com/dummy-apps:endpoint-metadata",
	"Networks": [
		{
			"NetworkMode": "container:c2ac6cc1890000f46c13eb833de94518a8d31328ec623f773f3f5abdca5d036f",
			"IPv4Addresses": [
				""
			]
		}
	],
	"MetadataFileStatus": "READY",
	"AvailabilityZone": "us-east-1b",
	"HostPrivateIPv4Address": "10.0.1.43",
	"HostPublicIPv4Address": "52.91.220.108"
}
{
	"Cluster": "dummy-cluster-ec2",
	"ContainerInstanceARN": "arn:aws:ecs:us-east-1:647336185665:container-instance/dummy-cluster-ec2/43cd4c8423cf4dca894f3bccfc3dcc2c",
	"TaskARN": "arn:aws:ecs:us-east-1:647336185665:task/dummy-cluster-ec2/0038882b0cc54b9488aeb11a9214acdd",
	"TaskDefinitionFamily": "first-run-task-definition",
	"TaskDefinitionRevision": "7",
	"ContainerID": "90d66ec6d373779bff9d3c18c78a29f9b194c92d8dcd1bcc7f569ec4172f0717",
	"ContainerName": "sleepy-app",
	"DockerContainerName": "/ecs-first-run-task-definition-7-sleepy-app-c094c0d1a5b1e9975e00",
	"ImageID": "sha256:a8edb9304fc85ca1b0f459b156ec21cbf664f8b62303d76a4c6fe25dbcde3eb8",
	"ImageName": "647336185665.dkr.ecr.us-east-1.amazonaws.com/dummy-apps:endpoint-metadata",
	"Networks": [
		{
			"NetworkMode": "container:c2ac6cc1890000f46c13eb833de94518a8d31328ec623f773f3f5abdca5d036f",
			"IPv4Addresses": [
				""
			]
		}
	],
	"MetadataFileStatus": "READY",
	"AvailabilityZone": "us-east-1b",
	"HostPrivateIPv4Address": "10.0.1.43",
	"HostPublicIPv4Address": "52.91.220.108"
}
```

### Metadata endpoints 
1. ECS_CONTAINER_METADATA_URI
2. ECS_CONTAINER_METADATA_URI_v4

Contienen información como:
```
{
  DockerId: '914a145887b6f0ec0ad14565fdac47d5720e3877a09bbae1cbd40c8a431f58d1',
  Name: 'sleepy-app',
  DockerName: 'ecs-first-run-task-definition-7-sleepy-app-caeae1faadb78ea87f00',
  Image: '647336185665.dkr.ecr.us-east-1.amazonaws.com/dummy-apps:endpoint-metadata',
  ImageID: 'sha256:a8edb9304fc85ca1b0f459b156ec21cbf664f8b62303d76a4c6fe25dbcde3eb8',
  Labels: {
    'com.amazonaws.ecs.cluster': 'dummy-cluster-ec2',
    'com.amazonaws.ecs.container-name': 'sleepy-app',
    'com.amazonaws.ecs.task-arn': 'arn:aws:ecs:us-east-1:647336185665:task/dummy-cluster-ec2/c56997f5096d425ba1572560c521bed3',
    'com.amazonaws.ecs.task-definition-family': 'first-run-task-definition',
    'com.amazonaws.ecs.task-definition-version': '7'
  },
  DesiredStatus: 'RUNNING',
  KnownStatus: 'RUNNING',
  Limits: { CPU: 256, Memory: 0 },
  CreatedAt: '2023-01-02T14:42:06.81228068Z',
  StartedAt: '2023-01-02T14:42:07.857067328Z',
  Type: 'NORMAL',
  Volumes: [
    {
      Source: '/var/lib/ecs/data/metadata/dummy-cluster-ec2/c56997f5096d425ba1572560c521bed3/sleepy-app',
      Destination: '/opt/ecs/metadata/eccede28-6d9f-4830-88d9-8e5432afbbba'
    }
  ],
  LogDriver: 'awslogs',
  LogOptions: {
    'awslogs-group': '/ecs/first-run-task-definition',
    'awslogs-region': 'us-east-1',
    'awslogs-stream': 'ecs/sleepy-app/c56997f5096d425ba1572560c521bed3'
  },
  ContainerARN: 'arn:aws:ecs:us-east-1:647336185665:container/dummy-cluster-ec2/c56997f5096d425ba1572560c521bed3/2c14392f-477b-488e-9a9e-bfc5e909d5d7',
  Networks: [
    {
      NetworkMode: 'awsvpc',
      IPv4Addresses: [Array],
      AttachmentIndex: 0,
      MACAddress: '0a:41:bf:0e:e0:b9',
      IPv4SubnetCIDRBlock: '10.0.1.0/24',
      PrivateDNSName: 'ip-10-0-1-226.ec2.internal',
      SubnetGatewayIpv4Address: '10.0.1.1/24'
    }
  ]
}
{
	"Cluster": "dummy-cluster-ec2",
	"ContainerInstanceARN": "arn:aws:ecs:us-east-1:647336185665:container-instance/dummy-cluster-ec2/43cd4c8423cf4dca894f3bccfc3dcc2c",
	"TaskARN": "arn:aws:ecs:us-east-1:647336185665:task/dummy-cluster-ec2/c56997f5096d425ba1572560c521bed3",
	"TaskDefinitionFamily": "first-run-task-definition",
	"TaskDefinitionRevision": "7",
	"ContainerID": "914a145887b6f0ec0ad14565fdac47d5720e3877a09bbae1cbd40c8a431f58d1",
	"ContainerName": "sleepy-app",
	"DockerContainerName": "/ecs-first-run-task-definition-7-sleepy-app-caeae1faadb78ea87f00",
	"ImageID": "sha256:a8edb9304fc85ca1b0f459b156ec21cbf664f8b62303d76a4c6fe25dbcde3eb8",
	"ImageName": "647336185665.dkr.ecr.us-east-1.amazonaws.com/dummy-apps:endpoint-metadata",
	"Networks": [
		{
			"NetworkMode": "container:6faccc1feb6e30021487448bb332c3ad138d33a4c9d12b4792a0426d44a1fd0a",
			"IPv4Addresses": [
				""
			]
		}
	],
	"MetadataFileStatus": "READY",
	"AvailabilityZone": "us-east-1b",
	"HostPrivateIPv4Address": "10.0.1.43",
	"HostPublicIPv4Address": "52.91.220.108"
}
```

### Cosas importantes de aws:
1. [Imagen en ecr](https://us-east-1.console.aws.amazon.com/ecr/repositories/private/647336185665/dummy-apps?region=us-east-1)
2. [Ejemplo de logs completos con ambos endpoints Y el fichero](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Fecs$252Ffirst-run-task-definition/log-events/ecs$252Fsleepy-app$252Fc56997f5096d425ba1572560c521bed3)
3. [ecs con ec2](https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/clusters)
4. Para meterse en la máquina de ec2 a cotillear: ssh -i test-key-pair.pem ec2-user@ec2-52-91-220-108.compute-1.amazonaws.com
5. Hay un target group y un loadbalancer, pero no correctamente configurados (por culpa del healthcheck del target group). Yo eliminaría el servicio creado en ecs, tenéis la task definition [aquí](https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/taskDefinitions/first-run-task-definition/status/ACTIVE), usad la última versión

