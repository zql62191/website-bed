# require 'bootstrap-sass'
require 'compass/import-once/activate'
require 'rgbapng'
require 'oily_png'
require 'borderbox'
require 'bourbon-compass'
require 'SassyStrings'
require 'sassy-math'
require '3d-ribbon'

project_path = "src"
http_path = "/"
css_dir = "css"
sass_dir = "styles"
images_dir = "images"
javascripts_dir = "scripts"
fonts_dir = "fonts"
http_images_path = "../img"
http_generated_images_path = "../img"
generated_images_dir = "../dist/img"

module Sass::Script::Functions
     # Does the supplied image exist?
     def file_exists(image_file)
          path = image_file.value
          Sass::Script::Bool.new(File.exists?(path))
     end
end

module Sass::Script::Functions
    def list_files(path)
        return Sass::Script::List.new(
            Dir.glob(path.value).map! { |x| Sass::Script::String.new(x) },
            :comma
        )
    end
end

# module Compass::SassExtensions::Functions::Sprites
#   def sprite_url(map)
#     verify_map(map, "sprite-url")
#     map.generate
#     generated_image_url(Sass::Script::String.new(map.name_and_hash))
#   end
# end

# module Compass::SassExtensions::Sprites::SpriteMethods
#   def name_and_hash
#     # puts path
#     "#{path}.png"
#   end

#   def cleanup_old_sprites
#     Dir[File.join(::Compass.configuration.generated_images_path, "#{path}.png")].each do |file|
#       log :remove, file
#       FileUtils.rm file
#       ::Compass.configuration.run_sprite_removed(file)
#     end
#   end
# end

# module Compass
#   class << SpriteImporter
#     def find_all_sprite_map_files(path)
#       glob = "*{#{self::VALID_EXTENSIONS.join(",")}}"
#       Dir.glob(File.join(path, "**", glob))
#     end
#   end
# end
