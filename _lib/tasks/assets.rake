desc "compile assets into their directories, then watch for changes"
task :assets => ["assets:watch"]
namespace :assets do
	desc "watch sass and js files for changes, and compile changes"
	multitask :watch => ["compass:watch", "js:sleep_watch"]
	
	desc "compile all js and sass files"
	multitask :compile => ["compass:compile", "js:sleep_compile"]
	
	desc "package all js and sass files"
	task :package => ["assets:package_css", "assets:package_js"]
	
	task :package_css => ["compass:compile"] do 
		require "yui/compressor"
		cssc = YUI::CssCompressor.new
		compress_assets File.join(CSS_DIR, "*.css"), cssc, PACKAGE_DIR, PACKAGE_CSS
	end
	
	task :package_js => ["js:compile"] do
		require "yui/compressor"
		jsc = YUI::JavaScriptCompressor.new :munge => true
		compress_assets File.join(CSS_DIR, "*.js"), jsc, PACKAGE_DIR, PACKAGE_JS	
	end
end