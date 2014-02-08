from settings import *

DEBUG = TEMPLATE_DEBUG = False

DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'
DATABASES['default']['NAME'] = 'link_sweeper_db'
DATABASES['default']['USER'] = 'link_sweep'
DATABASES['default']['PASSWORD'] = 'googleHACK'


ALLOWED_HOSTS = ['www.linksweeperjoeyuan.com','linksweeper.joeyuan.com']

STATIC_URL = 'http://linksweeper.joeyuan.com/static/'
STATIC_ROOT = '/home/joeyuan19/webapps/link_sweeper_static/'
STATICFILES_DIRS += (
   '/home/joeyuan19/webapps/link_sweeper/Google-24-Hr-Hackathon/Django_Project/LinkSweeper/static/',
)

