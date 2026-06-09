from django.core.management.base import BaseCommand
from cars.models import Car, CarImage

class Command(BaseCommand):
    help = 'Seed car images from media/cars folder'

    def handle(self, *args, **kwargs):
        CarImage.objects.all().delete()
        self.stdout.write('Deleted existing images...')

        image_map = {
            'Mercedes GLE':             'cars/mercedes-1.jpg',
            'Mercedes AMG C63':         'cars/mercedes-2.jpg',
            'Mercedes SL 500':          'cars/mercedes-3.jpg',
            'Mercedes AMG GT':          'cars/mercedes-4.jpg',
            'Mercedes E-Class':         'cars/mercedes-5.jpg',
            'Mercedes CLA':             'cars/mercedes-6.jpg',
            'Honda Civic Type R':       'cars/honda-1.jpg',
            'Honda Accord':             'cars/honda-2.jpg',
            'Honda Civic SI':           'cars/honda-3.jpg',
            'Tesla Model 3':            'cars/tesla-1.jpg',
            'Tesla Model S':            'cars/tesla-2.jpg',
            'Tesla Model X':            'cars/tesla-3.jpg',
            'Aston Martin DB11':        'cars/aston-1.jpg',
            'Aston Martin Vantage':     'cars/aston-2.jpg',
            'Aston Martin DBX':         'cars/aston-3.jpg',
            'Classic Mustang':          'cars/classic-1.jpg',
            'Classic Porsche 911':      'cars/classic-2.jpg',
            'Classic Jaguar E-Type':    'cars/classic-3.jpg',
        }

        for car_name, image_path in image_map.items():
            try:
                car = Car.objects.get(name=car_name)
                CarImage.objects.create(
                    car=car,
                    image=image_path,
                    is_primary=True,
                    order=1
                )
                self.stdout.write(f'  ✅ {car_name}')
            except Car.DoesNotExist:
                self.stdout.write(f'  ❌ Not found: {car_name}')

        self.stdout.write(self.style.SUCCESS(f'\n🎉 Done! Images seeded.'))