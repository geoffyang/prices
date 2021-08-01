from flask.cli import AppGroup
from .users import seed_users, undo_users
from .collections import seed_collections, undo_collections
from .services import seed_services, undo_services
from .hospitals import seed_hospitals, undo_hospitals
from .comments import seed_comments, undo_comments
from .service_collections import seed_service_collections, undo_service_collections

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_hospitals()
    seed_services()
    seed_collections()
    seed_comments()
    seed_service_collections()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_service_collections()
    undo_comments()
    undo_collections()
    undo_services()
    undo_hospitals()
    undo_users()
    # Add other undo functions here
