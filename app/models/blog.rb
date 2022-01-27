class Blog < ActiveRecord::Base
  belongs_to :category
  validates_presence_of :title, :content
  has_many :comments
  paginates_per 3
  has_rich_text :blog_content

  before_create :init_state
  after_create :self_draft
  scope :submitted, -> {where("state = 'submitted'")}

  state_machine :state, initial: :new do
    event :draft do
      transition :new => :drafted
    end
    event :submit do
      transition :drafted => :submitted
      transition :new => :submitted
    end
  end

  def to_json
    {
      id: id,
      title: title,
      date: created_at.strftime("%Y/%m/%d"),
      created_at: created_at.strftime("%Y/%m/%d %T"),
      content: content,
      state: state_name,
      category_id: category_id,
      category_name: category.name,
      comments: comments
    }
  end

  private
    def init_state
      self.state = :new
    end

    def self_draft
      self.draft!
    end
end
