require File.join(SCRIPT_DIR, "_lib", "plugins", "constants")

def compress_assets dir_string, compressor, dir, raw_name
	output = File.join(dir, raw_name)
	
	package = ""
	Dir[dir_string].each do |file|
		package << compressor.compress(File.open(file,"r"))
	end
	
	# Write out the package twice, once as raw_name and once as the file's sha1
	File.open(output, "w") { |f| f.write(package) }
	HASH_CACHE.recompute!
	output = File.join(dir, "#{HASH_CACHE[raw_name]}#{File.extname(raw_name)}")
	File.open(output, "w") { |f| f.write(package) }
end