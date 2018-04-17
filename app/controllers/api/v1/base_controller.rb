class Api::V1::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid do |e|
    errors = e.record.errors.details
    render template: "api/v1/errors/error", locals: { errors: errors }, status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do
    errors = {
      email: [
        {
          error: "invalid",
          value: "invalid_email",
        },
      ],
    }
    render template: "api/v1/errors/error", locals: { errors: errors }, status: :bad_request
  end

  rescue_from NoMethodError do
    errors = {
      param: [
        {
          error: "Bad Parameter",
          value: "invalid_param",
        },
      ],
    }
    render template: "api/v1/errors/error", locals: { errors: errors }, status: :bad_request
  end
end
