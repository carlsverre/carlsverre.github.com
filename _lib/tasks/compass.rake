desc "compile sass files in ./css/sass into ./css"
task :compass => ["compass:compile"]
namespace :compass do
	desc "compile sass files in ./css/sass into ./css"
	task :compile do
		sh "compass compile -c #{COMPASS_CONFIG} #{SCRIPT_DIR}"
	end
	
	desc "watch changes in ./css/sass and compile files as they change into ./css"
	task :watch do
		sh "compass watch -c #{COMPASS_CONFIG} #{SCRIPT_DIR}"
	end
end