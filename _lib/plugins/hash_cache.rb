# -*- encoding : utf-8 -*-
require 'find'

module CarlSverre
	class HashCache
	  def initialize(directory)
	    @directory = directory
	    @cache = {}
	  end
  
	  def compute_dir
	    Find.find(@directory) do |entry|
	      if File.basename(entry)[0] == ?.
	        Find.prune
	      end
	      next if FileTest.directory?(entry)
      
	      path = File.expand_path(entry)
	      compute_and_store File.basename(entry), path
	    end
	  end
	
		def recompute!
			@cache.clear
			compute_dir
		end
  
	  def compute_and_store entry, path
	    #@cache[entry] = `git hash-object #{path}`.strip
			@cache[entry] = `openssl dgst -sha1 #{path} | awk '{print $2}'`.strip
	  end
  
	  def [](entry)
	    @cache[entry]
	  end
  
	  def count
	    return @cache.count
	  end
	end
end