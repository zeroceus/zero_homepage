class Blog < ActiveRecord::Base
  belongs_to :category
  validates_presence_of :title, :content
  has_many_attached :images

  def preview(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render(content)
  end
end
