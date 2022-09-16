class ApplicationController < ActionController::API

    rescue ActiveRecord::RecordNotFound, with: :record_not_found
    rescue JWT::DecodeError, with: :decode_error


  def authorize
    @current_user = get_current_user
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user
  end

  def authorize_admin
      render json: { errors: ['Not authorized'] }, status: :unauthorized unless @current_user.role == "admin"
  end


  def get_current_user
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      current_user = User.find(@decoded[:user_id])
    end
  end


  def record_not_found(e)
    render json: { errors: e.message }, status: :unauthorized
  end

  def decode_error(e)
    render json: { errors: e.message }, status: :unauthorized
  end

end
