require "#{File.expand_path(File.dirname(__FILE__))}/hash_cache.rb"

ROOT_DIR = File.expand_path(File.join(File.dirname(__FILE__), "..", ".."))
HASH_CACHE = CarlSverre::HashCache.new(File.join(ROOT_DIR, "assets", "packages"))
HASH_CACHE.compute_dir