json.extract! @blog, :id, :title, :content, :category_id
json.date @blog.created_at.strftime("%Y/%m/%d")
json.created_at @blog.created_at.strftime("%Y/%m/%d %T")
json.state @blog.state_name
json.category_name @blog.category.name

json.comments @blog.comments.each do |comment|
  json.extract! comment, :content
  json.user comment.user, :name
  json.created_at comment.created_at.strftime("%Y/%m/%d %H:%m")
end