"""init

Revision ID: 58a78de6ac3a
Revises: 
Create Date: 2024-01-30 12:00:59.554853

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58a78de6ac3a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Car_Infos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('make', sa.String(), nullable=False),
    sa.Column('model', sa.String(), nullable=False),
    sa.Column('mileage', sa.Integer(), nullable=False),
    sa.Column('general_info', sa.String(), nullable=False),
    sa.Column('engine_info', sa.String(), nullable=True),
    sa.Column('light_info', sa.String(), nullable=True),
    sa.Column('wheel_info', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Car_Infos'))
    )
    op.create_table('Maintenance_Infos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rec_oil_service', sa.String(), nullable=True),
    sa.Column('rec_oil_type', sa.String(), nullable=True),
    sa.Column('inputed_oil_service', sa.String(), nullable=True),
    sa.Column('rec_tire_roto', sa.String(), nullable=True),
    sa.Column('inputed_tire_roto', sa.String(), nullable=True),
    sa.Column('rec_tire_psi', sa.String(), nullable=True),
    sa.Column('rec_break_fluid_service', sa.String(), nullable=True),
    sa.Column('inputed_break_fluid_service', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Maintenance_Infos'))
    )
    op.create_table('Saved_Cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Saved_Cars'))
    )
    op.create_table('Users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Users'))
    )
    op.create_table('Garages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('saved_car_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['saved_car_id'], ['Saved_Cars.id'], name=op.f('fk_Garages_saved_car_id_Saved_Cars')),
    sa.ForeignKeyConstraint(['user_id'], ['Users.id'], name=op.f('fk_Garages_user_id_Users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Garages'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Garages')
    op.drop_table('Users')
    op.drop_table('Saved_Cars')
    op.drop_table('Maintenance_Infos')
    op.drop_table('Car_Infos')
    # ### end Alembic commands ###