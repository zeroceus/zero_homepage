class Category < ActiveRecord::Base
  validates_presence_of :name
  has_many :blogs
  # has_one_attached :cover

  def self.all_to_json
    self.includes(:blogs).map do |category|
      {
        id: category.id,
        name: category.name,
        blogs_count: category.blogs.count,
        # cover_url: category.cover.attached? ? category.service_url : '',
      }
    end
  end
end
