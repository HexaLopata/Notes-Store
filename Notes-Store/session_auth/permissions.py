from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return hasattr(obj, 'author') and obj.author.pk == request.user.pk