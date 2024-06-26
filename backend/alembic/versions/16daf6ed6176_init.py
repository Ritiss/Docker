"""init

Revision ID: 16daf6ed6176
Revises: 
Create Date: 2024-06-01 18:40:13.334130

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '16daf6ed6176'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_profile',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('creation_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('user_id', name=op.f('pk_user_profile'))
    )
    op.create_index(op.f('ix_user_profile_user_id'), 'user_profile', ['user_id'], unique=False)
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('user_id', name=op.f('pk_users'))
    )
    op.create_index(op.f('ix_users_user_id'), 'users', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_user_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_user_profile_user_id'), table_name='user_profile')
    op.drop_table('user_profile')
    # ### end Alembic commands ###
