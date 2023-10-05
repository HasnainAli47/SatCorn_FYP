from django.urls import path
from .views import RegisterView, loginView, UserView, logoutView, VerifyOTPView, CreateFarmView, CreateSeasonView, UpdateSeasonView, DeleteSeasonView, DeleteFarmView, CreateFieldView, UpdateFieldView, DeleteFieldView, FieldListView, FarmListView, SeasonListView, CreateCropRotationView, UpdateCropRotationView, CropRotationListView
# CreateFieldView, RetrieveFieldsView, DeleteFieldView, CalculateNDVIView


urlpatterns = [
    # User register
    path("register", RegisterView.as_view(), name="register"),
    path("verify-otp", VerifyOTPView.as_view(), name="verify-otp"),
    
    # Login and logout
    path("login", loginView.as_view(), name="login"),
    path("logout", logoutView.as_view(), name="logout"),
    path("user", UserView.as_view(), name="user"),
    
    # Farms Handling
    path("create-farm", CreateFarmView.as_view(), name="create-farm"),
    path("delete-farm/<int:farm_id>", DeleteFarmView.as_view(), name="delete-farm"),
    path("get-farms", FarmListView.as_view(), name="retrieve-farms"),
    path("get-farms/<int:farm_id>", FarmListView.as_view(), name="retrieve-farms"),
    
    # Season Handling
    path("create-season", CreateSeasonView.as_view(), name="season"),
    path("update-season/<int:season_id>", UpdateSeasonView.as_view(), name="update-season"),
    path("delete-season/<int:season_id>", DeleteSeasonView.as_view(), name="delete-season"),
    path("get-seasons", SeasonListView.as_view(), name="retrieve-seasons"),
    path("get-seasons/<int:season_id>", SeasonListView.as_view(), name="retrieve-seasons"),
    
    # Field Handling
    path("create-field", CreateFieldView.as_view(), name="create-field"),
    path("get-fields", FieldListView.as_view(), name="retrieve-fields"),
    path("get-fields/<int:farm_id>", FieldListView.as_view(), name="retrieve-fields"),
    path("delete-field/<int:field_id>", DeleteFieldView.as_view(), name="delete-field"),
    path("update-field/<int:field_id>", UpdateFieldView.as_view(), name="update-field"),
    
    # Crop Rotation Handling
    path("create-crop-rotation", CreateCropRotationView.as_view(), name="create-crop-rotation"),
    path("update-crop-rotation/<int:crop_rotation_id>", UpdateCropRotationView.as_view(), name="update-crop-rotation"),
    path("get-crop-rotations", CropRotationListView.as_view(), name="retrieve-crop-rotations"),
    path("get-crop-rotations/<int:crop_rotation_id>", CropRotationListView.as_view(), name="retrieve-crop-rotations"),
    # path("calculate-ndvi/<int:field_id>", CalculateNDVIView.as_view(), name="calculate-ndvi"),
]