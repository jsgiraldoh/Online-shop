package com.perfiltic.onlineshop.service;

import com.perfiltic.onlineshop.domain.WishList;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link WishList}.
 */
public interface WishListService {

    /**
     * Save a wishList.
     *
     * @param wishList the entity to save.
     * @return the persisted entity.
     */
    WishList save(WishList wishList);

    /**
     * Get all the wishLists.
     *
     * @return the list of entities.
     */
    List<WishList> findAll();


    /**
     * Get the "id" wishList.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WishList> findOne(Long id);

    /**
     * Delete the "id" wishList.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
