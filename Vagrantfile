unless Vagrant.has_plugin?("vagrant-docker-compose")
	system("vagrant plugin install vagrant-docker-compose")
	puts "Dependencies installed, please try the command again."
	exit
end

Vagrant.configure("2") do |config|
	config.vm.box = "ubuntu/trusty64"
	
	config.vm.network(:forwarded_port, guest: 80, host: 8082)
	
	config.vm.provision :shell, inline: "apt-get update"
	config.vm.provision :docker
	config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", rebuild: true, project_name: "rootcause", run: "always"
end