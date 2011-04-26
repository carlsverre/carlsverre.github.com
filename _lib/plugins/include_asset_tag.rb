module CarlSverre
	class IncludeAssetTag < Liquid::Tag
		def initialize tag_name, text, tokens
			super
			@text = text
		end
		
		def render context
			 
		end
	end