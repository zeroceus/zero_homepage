class GithubSetting
  class << self
    
    ["client_id", "client_secret"].each do |key|
      define_method "#{key}" do
        config[key]
      end
    end

    private
      def config
        YAML.load_file("#{Rails.root}/config/github_setting.yml")[Rails.env]
      end
  end

end
