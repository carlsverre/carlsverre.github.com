desc "compile coffee files in ./js/coffee into js files in ./js"
task :js => ["js:compile"]
namespace :js do
	
	desc "watch changes in ./js/coffee and compile files as they change into ./js" 
	task :watch do
		sh "coffee --watch -o #{JS_DIR} --compile #{COFFEE_DIR}"
	end
	
	desc "compile coffee files in ./js/coffee into js files in ./js"
	task :compile do
		sh "coffee -o #{JS_DIR} --compile #{COFFEE_DIR}"
	end
	
	task :sleep_watch do
		sleep 1
		Rake::Task["js:watch"].invoke
	end
	
	task :sleep_compile do
		sleep 1
		Rake::Task["js:compile"].invoke
	end
end
