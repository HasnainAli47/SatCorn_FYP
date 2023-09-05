from django.urls import path
from .views import RegisterView, loginView, UserView, logoutView, VerifyOTPView, CreateFieldView, RetrieveFieldsView, DeleteFieldView


urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("login", loginView.as_view(), name="login"),
    path("user", UserView.as_view(), name="user"),
    path("logout", logoutView.as_view(), name="logout"),
    path("verify-otp", VerifyOTPView.as_view(), name="verify-otp"),
    path("create-field", CreateFieldView.as_view(), name="create-field"),
    path("get-fields", RetrieveFieldsView.as_view(), name="retrieve-fields"),
    path("delete-field/<int:field_id>", DeleteFieldView.as_view(), name="delete-field"),
]