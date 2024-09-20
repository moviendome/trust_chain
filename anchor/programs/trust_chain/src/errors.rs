use anchor_lang::prelude::*;

#[error_code]
pub enum TrustChainError {
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("The provided address should be 100 characters long maximum.")]
    AddressTooLong,
    #[msg("The provided profile should be 200 characters long maximum.")]
    ProfileTooLong,
    #[msg("The provided cover should be 200 characters long maximum.")]
    CoverTooLong,
    #[msg("The provided category should be 50 characters long maximum.")]
    CategoryTooLong,
    #[msg("The provided title should be 50 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided comment should be 200 characters long maximum.")]
    CommentTooLong,
    #[msg("The provided rating should be between 1 and 5.")]
    InvalidRating,
}
