use anchor_lang::prelude::*;

pub const NAME_LENGTH: usize = 50;
pub const ADDRESS_LENGTH: usize = 100;
pub const PROFILE_LENGTH: usize = 200;
pub const COVER_LENGTH: usize = 200;
pub const CATEGORY_LENGTH: usize = 50;
pub const TITLE_LENGTH: usize = 50;
pub const COMMENT_LENGTH: usize = 200;

#[account]
#[derive(InitSpace)]
pub struct BusinessEntryState {
    pub owner: Pubkey,
    #[max_len(255)]
    pub category: String,
    #[max_len(255)]
    pub name: String,
    #[max_len(255)]
    pub address: String,
    #[max_len(255)]
    pub profile: String,
    #[max_len(255)]
    pub cover: String,
    pub latitude: i64,
    pub longitude: i64,
    pub created_at: i64,
}

#[account]
#[derive(InitSpace)]
pub struct ReviewEntryState {
    pub business: Pubkey,
    pub owner: Pubkey,
    #[max_len(255)]
    pub title: String,
    pub rating: u8,
    #[max_len(255)]
    pub comment: String,
    pub created_at: i64,
}
