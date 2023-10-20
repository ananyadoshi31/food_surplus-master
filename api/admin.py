from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Food)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Review)
admin.site.register(Category)
admin.site.register(Address)
admin.site.register(FoodImage)
admin.site.register(Notification)