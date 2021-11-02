from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import User, UserProfile

# , OTP, Connections, Notification, ChatConnection


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False


class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    list_display = ("email", "is_superuser", "is_verified", "is_active")
    list_filter = ("is_superuser",)
    fieldsets = (
        (None, {"fields": ("email", "password", "is_verified")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()
    inlines = (UserProfileInline,)


admin.site.register(User, UserAdmin)
admin.site.site_header = "Talkpiper Group Administration"

# @admin.register(OTP)
# class OTPAdmin(admin.ModelAdmin):
#     list_display = ('email','otp')

# admin.site.register(Connections)
# admin.site.register(ChatConnection)
# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ('username', 'category')
